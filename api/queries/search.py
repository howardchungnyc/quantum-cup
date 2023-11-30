import os
from whoosh import qparser
from whoosh.index import create_in, exists_in
from whoosh.fields import Schema, TEXT, ID
from whoosh.qparser import MultifieldParser
from whoosh.filedb.filestore import FileStorage
from .client import Queries
from models.search import SearchItem, SearchMatchList, SearchItemIn
from models.products import ProductList
from .products import ProductQueries
from typing import List, Any
from fastapi import HTTPException


class SearchEngine:
    # Schema definition for the Quantum Cup search engine
    schema = Schema(
        product_id=ID(stored=True),  # Product ID
        product=TEXT(stored=True),  # Product name
        description=TEXT(stored=True),  # Product description
        vendor_name=TEXT(stored=True),  # Vendor full name
        vendor_id=ID(stored=True),  # Vendor ID
    )

    def __init__(self, index_dir="indexdir"):
        """
        Initialize the search engine

        param: index_dir - The directory where the index is stored
        """
        self.index_dir = index_dir
        if not os.path.exists(self.index_dir):
            os.mkdir(self.index_dir)
        if exists_in(self.index_dir) is False:
            self.ix = create_in(self.index_dir, SearchEngine.schema)
            self._emptyIndex = True
        else:
            storage = FileStorage(self.index_dir)
            self.ix = storage.open_index()
            self._emptyIndex = False

    def valid_index(self):
        """
        Check if the indexed data is valid

        return: True if the index is valid, False otherwise
        """
        return not self._emptyIndex

    def indexSingle(self, doc):
        """
        Index a single document

        param: doc - dictionary containing the document to index
        """
        writer = self.ix.writer()
        writer.add_document(**doc)
        writer.commit()
        self._emptyIndex = False

    def index(self, docs):
        """
        Index a list of documents

        param: docs - list of dictionaries containing the documents to index
        """
        writer = self.ix.writer()
        for doc in docs:
            writer.add_document(**doc)
        writer.commit()
        self._emptyIndex = False

    def search(
        self,
        inputQuery: str,
        searchFields=["product", "description", "vendor_name"],
    ) -> List[Any] | List[dict[str, Any]]:
        """
        Search the index for the given query string
        param: inputQuery - the query string
        param: searchFields - list of fields to search

        return: list of dictionaries containing the search results
        """
        with self.ix.searcher() as searcher:
            # Create a parser configuration object using OR semantics
            og = qparser.OrGroup.factory(0.9)
            # Create a parser that parses the query using this group of rules
            parser = MultifieldParser(searchFields, self.ix.schema, group=og)
            # Configure the parser to allow fuzzy matching
            parser.add_plugin(qparser.FuzzyTermPlugin())
            # Parse the query string into a query object
            query = parser.parse(inputQuery)
            # Perform the search
            results = searcher.search(query)
            if len(results) == 0:
                return []
            return [
                {
                    "product_id": r["product_id"],
                    "product": r["product"],
                    "description": r["description"],
                    "vendor_name": r["vendor_name"],
                    "vendor_id": r["vendor_id"],
                }
                for r in results
            ]


class SearchQueries(Queries):
    collection_name = "products"

    @classmethod
    def all_products(cls):
        prod: ProductList = ProductQueries().get_all_products()
        return [
            {
                "product_id": p.id,
                "product": p.name,
                "description": p.description,
                "vendor_name": p.vendor_name,
                "vendor_id": p.vendor_id,
            }
            for p in prod.products
        ]

    def __init__(self):
        super().__init__()
        # Create a new search engine
        self.engine = SearchEngine()
        if self.engine.valid_index() is False:
            # Get all products
            products = SearchQueries.all_products()
            # Index the products
            self.engine.index(products)

    def search(self, query: str | None, sel: str | None) -> SearchMatchList:
        """
        Search the index for the given query string
        param: query - the query string
        param: sel - comma separated list of fields to search

        return: list of dictionaries containing the search results
        """
        if query is None:
            raise HTTPException(
                status_code=400, detail="Missing query string parameter"
            )
        if sel is None:
            sel_par = ["product", "description", "vendor_name"]
        else:
            sel_par = sel.split(",")
        return SearchMatchList(
            matches=self.engine.search(
                query, searchFields=sel_par
            )  # type: ignore
        )

    def update_index(self, data: SearchItemIn, account) -> SearchItem:
        """
        Add a new product to the search index
        """
        if account["role"] != "vendor":
            raise HTTPException(
                status_code=401,
                detail="Only vendors can index new products",
            )
        self.engine.indexSingle(data.dict())
        return SearchItem(**data.dict())

# Implementing Contextual Search
## Problem
Need to implement a mini search engine that can search for products by name,
description, and vendor name. The search engine must be able to do fuzzy search,
be easy to use, and be fast. Contextual search would be desirable, but it is not
mandatory.

## Solution
I decided to use Whoosh, a Python library for indexing and searching text. It
is easy to use and fast. It also supports fuzzy search, however, it does not
support contextual search. Elasticsearch would be a better choice for that, but
it is more complex to use and requires more resources.

## Back-end Implementation
### Additional Notes
I have implemented a class called `SearchEngine` that wraps the Whoosh library.
It is a simple class that can index and search documents. It is not a full
search engine, but it is enough for the Quantum Cup project.

### FastAPI Endpoint Template
| Action                          | Method | URL                                     |
| --------------------------------| ------ | --------------------------------------- |
| Search products by all fields   | GET    | /api/search?q=«query string»            |
| Search products by their name   | GET    | /api/search?q=«query string»&sel=name   |
| Search products by vendor       | GET    | /api/search?q=«query string»&sel=vendor |

`Note: sel is a comma-separated list of fields to search.`

example:
* Request: /api/search?q=coffee
* Response:
```json
[
  {"description": "Arabica beans are renowned for their smooth, mild flavor and "
                 "aromatic qualities. They are often considered the gold "
                 "standard of coffee beans. Grown at higher elevations in "
                 "regions like Colombia, Ethiopia, and Kenya, Arabica beans "
                 "are known for their bright acidity and nuanced flavors, "
                 "which can include fruity, floral, and nutty notes.",
  "product_id": "65604223e46736b3cee1720b",
  "product": "Arabica Beans",
  "vendor_name": "International Coffee Traders LLC",
  "vendor_id": "88304223e46736b3cee1720b"},
 {"description": "Brazilian Santos beans are grown in various regions of "
                 "Brazil. They have a mild, nutty flavor with low acidity, "
                 "making them a great choice for espresso blends. These beans "
                 "are often used as a base in many coffee blends.",
  "product_id": "655e53dd7cfbbffeb64798a4",
  "product": "Brazilian Santos",
  "vendor_name": "Brazil Exports Inc.",
  "vendor_id": "75904223e46736b3cee1720b"}
]
```

### Implementation Notes

#### Schema
The schema for the search engine is defined as follows:

```python
{
    "product_id": "Product ID",
    "product": "Product name",
    "description": "Product description",
    "vendor_name": "Vendor full name",
    "vendor_id": "Vendor ID"
}
```

This is the format of the documents that will be indexed and returned by the
search engine.

#### Indexing
During the backend initialization, the search engine will check if the index
directory exists. If it does not exist, it will create a new index, read the
products from the database, and index them using the schema defined above.
If it exists, it will open the existing index.

#### Inserting documents
The search engine can index a single document and add it to the index. When a
vendor creates a new product, the backend will call the `indexSingle` method
to add the new product to the index.

#### Searching
The search engine can search for documents using a query string. The query
string can be a single word or a phrase. The search engine will return a list
of documents that match the query string. The search engine will search for
the query string in the following fields: `name`, `description`, and
`vendor_name`. The search engine will also attempt to perform fuzzy search.

#### Using the search engine
The UI must perform searches using unrestricted queries as much as possible. If
the user is searching for a product, the UI must use the `name` selector in the
URL. If the user is searching for a vendor, the UI must use the `vendor` selector
in the URL.

## Front-end Implementation
### Functional Description
* The front-end must provide a search box where the user can enter a query string.
* This search box must be a React component, so it can be reused in other pages.
* The search box must have a selector that allows the user to select the type of
  search: `all`, `name`, or `vendor`.
* The search box must accept a callback function that will be called when the
  user presses the search button. If the callback function is not provided, the
  search box performs the default search, otherwise, it calls the callback only.

### Implementation Notes
#### SearchBlock Component
` function SearchBlock({ placeholder, onSubmit, fieldsSelector })`

This component is a search block with a search input and submit button.

If the caller provides an `onSubmit` handler, it will be called when the user
submits the search form. Otherwise, the default action is to do a fuzzy search.

If a fuzzy search is done, the caller can optionally provide a `fieldsSelector`,
a string containing a comma-separated list of fields to search. If no
`fieldsSelector` is provided, the default is to search all fields.

Valid fields are:
- "name"
- "description"
- "vendor"

Example of `fieldsSelector`:
- "name,description"
- "vendor"
- "" (or not provided)

##### Props

- `placeholder` (string): Placeholder text for search input.
- `onSubmit` (function): Handler for search submit.
- `fieldsSelector` (string): Comma-separated list of fields to search.

Returns: JSX.Element - Search block component.

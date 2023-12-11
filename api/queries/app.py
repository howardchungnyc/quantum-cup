from fastapi import HTTPException, Form
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import os

# Get the Text Analytics endpoint and API key from environment variables
endpoint = os.environ.get("ENDPOINT", "")
api_key = os.environ.get("TEXT_ANALYTICS_API_KEY", "")


def analyze_sentiment(sendText: str = Form(...)):
    try:
        # Prepare the document for sentiment analysis
        documents = [sendText]

        # Initialize the Text Analytics client
        client = TextAnalyticsClient(
            endpoint=endpoint, credential=AzureKeyCredential(api_key)
        )

        results = client.analyze_sentiment(documents=documents)

        response_data = []

        # Process the results for each document
        for i, result in enumerate(results):
            if not result.is_error:
                # Construct sentiment data for a successful result
                sentiment_data = {
                    "document_text": documents[i],
                    "overall_sentiment": result.sentiment,
                    "confidence_scores": result.confidence_scores,
                    "sentences": [
                        {
                            "sentence_text": sentence.text,
                            "sentence_sentiment": sentence.sentiment,
                            "confidence_scores": sentence.confidence_scores,
                        }
                        for sentence in result.sentences
                    ],
                }
                response_data.append(sentiment_data)
            else:
                # Construct error data for an unsuccessful result
                error_data = {"error": str(result.error)}
                response_data.append(error_data)

        # Return the final response data
        return {"results": response_data}

    except Exception as e:
        # Catch any exceptions and raise an
        # HTTPException with a 500 status code
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

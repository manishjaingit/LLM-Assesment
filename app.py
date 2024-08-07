import os
from dotenv import load_dotenv
import ollama
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
import sys
import json

# Load environment variables from .env file
load_dotenv()

def get_response(model: str, query: str) -> dict:
    """
    This function takes two parameters, model and query, both strings,
    and returns a response based on the input.

    :param model: The model name or identifier (string)
    :param query: The query or question to be processed (string)
    :return: A dictionary containing the response based on the model and query
    """
    
    # Predefined responses
    default_response = {"default": "I'm not sure how to respond to that."}
    missing_input_response = {"missing": "Model and query are required."}
    
    # Check if both model and query are provided
    if not model or not query:
        return missing_input_response
    
    try:
        if model.lower() == "ollama2":
            # Get response from Ollama API
            response = ollama.chat(model='llama2', messages=[
                {
                    'role': 'user',
                    'content': query,
                },
            ])
            return {query: response['message']['content']}
        
        elif model.lower() == "mistral":
            # Get API key from environment variables
            api_key = os.getenv('MISTRAL_API_KEY')
            if not api_key:
                return {"error": "API key for Mistral is missing."}
            
            # Get response from Mistral API
            client = MistralClient(api_key=api_key)
            messages = [
                ChatMessage(role="user", content=query)
            ]
            chat_response = client.chat(
                model="mistral-large-latest",
                messages=messages,
            )
            return {query: chat_response.choices[0].message.content}
        
        else:
            return default_response
            
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

if __name__ == "__main__":
    model = sys.argv[1]  # 'model'
    query = sys.argv[2]  # 'question'
    response = get_response(model, query)
    print(json.dumps(response))

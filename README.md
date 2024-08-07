# Distributed LLM Assignment

This project consists of two main components: a Python program that interacts with LLMs (Llama2 and Mistral) and a Node.js API server using Express.js for managing conversations.

## 1. Python Program

### Features
- **Model Selection:** When the program starts, users can select between Llama2 and Mistral models.
- **Query Handling:** Users can send queries to the selected model and receive answers from the LLM.
- **Context Maintenance:** The program maintains communication context between the user and the LLM, allowing for continuous conversation.
- **Dockerized:** The Python program is wrapped in a Docker container for ease of deployment.

### Files
- `app.py`: Main Python script to interact with LLMs.
- `pip install -r requirements.txt` : installing requirements

### Usage
1. **Start the Program:**
   ```bash
   ollama run llama2
   docker build -t my-node-app .
   docker run -p 3000:3000 my-node-app

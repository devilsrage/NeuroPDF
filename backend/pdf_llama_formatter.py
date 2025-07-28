def format_messages_for_llama(user_profession, pdf_markdown_content, max_content_length=8000):
    """
    Formats user profession and PDF markdown content into system and user messages
    for sending to Llama via Hugging Face API.
    
    Args:
        user_profession (str): The user's profession/role (e.g., "software engineer", "marketing manager")
        pdf_markdown_content (str): The PDF content converted to markdown
        max_content_length (int): Maximum length of content to include (to avoid token limits)
    
    Returns:
        dict: Formatted messages with system and user components
    """
    
    # Truncate content if it's too long to avoid token limits
    if len(pdf_markdown_content) > max_content_length:
        pdf_markdown_content = pdf_markdown_content[:max_content_length] + "\n\n[Content truncated due to length...]"
    
    # Create profession-specific system message
    system_message = f"""You are an expert document analyzer specializing in creating summaries for {user_profession}s. 

Your task is to:
1. Provide a comprehensive summary of the document that is specifically relevant to a {user_profession}'s perspective and interests
2. Extract and define the most important keywords/terms from the document that a {user_profession} should understand
3. Focus on information that would be actionable or valuable for someone in the {user_profession} role

Format your response as follows:
## Summary for {user_profession.title()}
[Provide a detailed summary focused on aspects relevant to this profession]

## Key Terms & Definitions
[List 5-10 important keywords with clear definitions, formatted as:]
- **Term**: Definition and relevance to the profession

Make sure the summary addresses how the content relates to typical responsibilities, challenges, or interests of a {user_profession}."""

    user_message = f"""Please analyze the following document content and provide a summary and key terms specifically tailored for a {user_profession}:

---
{pdf_markdown_content}
---

Remember to focus on information that would be most valuable and actionable for someone working as a {user_profession}."""

    # Return formatted messages
    return {
        "messages": [
            {
                "role": "system",
                "content": system_message
            },
            {
                "role": "user", 
                "content": user_message
            }
        ],
        "formatted_prompt": f"{system_message}\n\nHuman: {user_message}\n\nAssistant:"
    }

def send_to_huggingface_llama(user_profession, pdf_markdown_content, hf_api_token, model_name="meta-llama/Llama-2-7b-chat-hf"):
    """
    Complete function to format and send request to Hugging Face Llama model.
    
    Args:
        user_profession (str): User's profession
        pdf_markdown_content (str): PDF content in markdown
        hf_api_token (str): Hugging Face API token
        model_name (str): Hugging Face model name
    
    Returns:
        dict: API response or error
    """
    import requests
    import json
    
    # Format the messages
    formatted_data = format_messages_for_llama(user_profession, pdf_markdown_content)
    
    # Hugging Face API endpoint
    api_url = f"https://api-inference.huggingface.co/models/{model_name}"
    
    headers = {
        "Authorization": f"Bearer {hf_api_token}",
        "Content-Type": "application/json"
    }
    
    # Use the formatted prompt for Hugging Face API
    payload = {
        "inputs": formatted_data["formatted_prompt"],
        "parameters": {
            "max_new_tokens": 1000,
            "temperature": 0.7,
            "top_p": 0.9,
            "do_sample": True,
            "return_full_text": False
        }
    }
    
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()
        return {
            "success": True,
            "response": response.json(),
            "formatted_messages": formatted_data["messages"]
        }
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "error": str(e),
            "formatted_messages": formatted_data["messages"]
        }

# Example usage
if __name__ == "__main__":
    # Sample data
    user_profession = "software engineer"
    pdf_content = """
    # API Documentation
    
    ## Introduction
    REST APIs are a fundamental part of modern web development...
    
    ## Authentication
    All API requests must include a valid API key in the header...
    
    ## Rate Limiting
    The API implements rate limiting to prevent abuse...
    """
    
    # Format messages
    result = format_messages_for_llama(user_profession, pdf_content)
    
    print("System Message:")
    print(result["messages"][0]["content"])
    print("\n" + "="*50 + "\n")
    print("User Message:")
    print(result["messages"][1]["content"])
    
    # To actually send to Hugging Face (uncomment and add your token):
    # hf_token = "your_hugging_face_token_here"
    # api_result = send_to_huggingface_llama(user_profession, pdf_content, hf_token)
    # print(api_result)
from datetime import datetime

def create_chat_doc(metadata, text, llm_response):
    return {
        "pdf_metadata": metadata,
        "extracted_text": text,
        "llm_response": llm_response,
        "timestamp": datetime.utcnow()
    }

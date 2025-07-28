import os
import traceback
from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename
from services.pdf_processor import pdf_to_markdown_and_outline  
from services.storage_service import save_chat_data
from services.llm_service import query_llm  # Updated to absolute import

def handle_pdf_upload():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)
    file.save(upload_path)

    try:
        # 1. Extract markdown + outline
        result = pdf_to_markdown_and_outline(upload_path)
        markdown = result["markdown"]
        outline = result["outline"]

        # 2. Generate summary using LLM
        prompt = f"Summarize this document:\n\n{markdown[:4000]}"
        llm_response = query_llm(prompt)

        # 3. Metadata for DB
        metadata = {
            "pdf_name": filename,
            "pdf_size": os.path.getsize(upload_path),
            "pdf_type": file.mimetype
        }

        # 4. Save in MongoDB
        save_chat_data(metadata, markdown, llm_response)

        # 5. Clean up file
        os.remove(upload_path)

        # 6. Respond to client
        return jsonify({
            "message": "Success",
            "llm_response": llm_response,
            "markdown": markdown,
            "outline": outline
        }), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

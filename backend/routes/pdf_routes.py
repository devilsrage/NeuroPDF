from flask import Blueprint
from controllers.pdf_controller import handle_pdf_upload
from services.storage_service import collection

pdf_bp = Blueprint("pdf", __name__)

@pdf_bp.route("/upload", methods=["POST"])
def upload():
    return handle_pdf_upload()

@pdf_bp.route("/health", methods=["GET"])
def health_check():
    try:
        collection.find_one()
        return {"status": "MongoDB connected"}, 200
    except Exception as e:
        return {"status": "MongoDB not connected", "error": str(e)}, 500  

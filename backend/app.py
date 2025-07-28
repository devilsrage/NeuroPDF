from flask import Flask
from flask_cors import CORS  
from dotenv import load_dotenv
from routes.pdf_routes import pdf_bp
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = os.getenv("UPLOAD_FOLDER", "uploads")
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Register routes
app.register_blueprint(pdf_bp, url_prefix="/api/pdf")

if __name__ == "__main__":
    app.run(debug=True, port=5000)

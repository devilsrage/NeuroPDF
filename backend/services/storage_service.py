from pymongo import MongoClient
from config import Config
from models.chat_model import create_chat_doc
from datetime import datetime

# Configuration
MONGO_URI = Config.MONGO_URI
DB_NAME = Config.DB_NAME
COLLECTION_NAME = "chat_logs"

# Connect to MongoDB server
client = MongoClient(MONGO_URI)

# Get list of existing databases
existing_dbs = client.list_database_names()

# Check if the database exists
if DB_NAME not in existing_dbs:
    print("Database not found. Creating new database...")
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    
    # Insert dummy document to trigger DB and collection creation
    collection.insert_one({"init": True})
    print(f"Database '{DB_NAME}' and collection '{COLLECTION_NAME}' created.")
else:
    print(f"Database '{DB_NAME}' already exists. Using existing database.")
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

# Sample function to save chat data
def save_chat_data(metadata, text, response):
    doc = create_chat_doc(metadata, text, response)
    collection.insert_one(doc)
    print("✅ Chat document inserted.")

# Example usage (can be removed in production)
if __name__ == "__main__":
    sample_metadata = {"user_id": "sayak", "timestamp": datetime.utcnow()}
    sample_text = "What is MongoDB?"
    sample_response = "MongoDB is a NoSQL database."

    save_chat_data(sample_metadata, sample_text, sample_response)

    # Fetch and print all chat logs (excluding _id for clarity)
    chats = list(collection.find({}, {"_id": 0}))
    print("Chat Logs in DB:", chats)

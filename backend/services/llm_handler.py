import time
import random
import google.generativeai as genai
from config import Config
from google.api_core.exceptions import ResourceExhausted, InternalServerError

genai.configure(api_key=Config.GOOGLE_API_KEY)
model = genai.GenerativeModel('models/gemini-1.5-pro')

def query_llm(prompt):
    max_retries = 5
    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt)
            return response.text

        except ResourceExhausted as e: 
            wait_time = (2 ** attempt) + random.uniform(0, 1)  # exponential backoff + jitter
            print(f"[!] Rate limit hit (attempt {attempt + 1}/{max_retries}). Retrying in {wait_time:.2f} seconds...")
            time.sleep(wait_time)

        except InternalServerError as e:
            print("[!] Gemini internal error. Retrying...")
            time.sleep(2)

        except Exception as e:
            raise RuntimeError(f"[✗] Gemini API error: {str(e)}")

    raise RuntimeError("[✗] Failed after retrying due to Gemini rate limit.")

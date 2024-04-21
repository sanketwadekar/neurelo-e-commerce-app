import os
from dotenv import load_dotenv

load_dotenv()

def get_neurelo_client():
	NEURELO_API_HOST = os.getenv("NEURELO_API_HOST") or ""
	NEURELO_API_KEY = os.getenv("NEURELO_API_KEY") or ""
	return {'host': NEURELO_API_HOST, 'key': NEURELO_API_KEY}

if __name__ == "main":
	get_neurelo_client()
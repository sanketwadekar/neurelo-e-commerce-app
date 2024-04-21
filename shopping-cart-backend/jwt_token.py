import jwt
import datetime
from functools import wraps
from flask import jsonify, request
import os
from dotenv import load_dotenv

load_dotenv()


secret_key = os.getenv("JWT_SECRET") or "temp"

def get_token(user_id, username):
# Example payload
	payload = {
			'user_id': user_id,
			'username': username,
			'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expiration time
	}

	# Secret key to sign the token

	# Encode the token
	token = jwt.encode(payload, secret_key, algorithm='HS256')
	print("Encoded Token:", token)
	return token

def validate_jwt(token, secret_key):
    try:
        # Decode the token
        decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
        return decoded_token  # If decoding succeeds, return the decoded token
    except jwt.ExpiredSignatureError:
        # Token has expired
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        # Token is invalid
        return {"error": "Invalid token"}

def decode_token(token, secret_key):
	# Decode the token
	decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
	print("Decoded Token:", decoded_token)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Check if the request contains a token
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            # Decode the token using the secret key
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        # If token is valid, pass the decoded token to the route function
        return f(data, *args, **kwargs)

    return decorated

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from client import get_neurelo_client
from get_all_products import get_all_products
from get_product_details import get_product_by_id
from checkout import create_order
from jwt_token import token_required
from get_orders import get_orders
from login import login

app = Flask(__name__)
CORS(app)

client = get_neurelo_client()

@app.route("/products", methods=['GET'])
def get_products():
    data = get_all_products(client)
    response = make_response(data)
    return response

@app.route('/products/<string:id>', methods=['GET'])
@token_required
def get_product_details(token, id):
    product = get_product_by_id(client, id)
    if product is None:
        return make_response('', 400)
    return make_response(product)

@app.route('/checkout', methods=['POST'])
@token_required
def checkout(token):
    if request.is_json:
        data = request.get_json()
        response = create_order(client, data, token['user_id'])
        if response == True:
            return jsonify({"status": 1}), 200
        else:
            return jsonify({"error": "Failed to place order"}), 400
    else:
        return jsonify({"error": "Request must contain JSON data"}), 400

@app.route("/orders", methods=['GET'])
@token_required
def handle_get_orders(token):
    data = get_orders(client, token['user_id'])
    return jsonify(data)


@app.route("/login", methods=["POST"])
def handle_login():
    if request.is_json:
        data = request.get_json()
        response = login(client, data['username'], data['password'])
        if response[0] == True:
            return jsonify({"status": 1, "token": response[1]}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 400
    else:
        return jsonify({"error": "Request must contain JSON data"}), 400

if __name__ == "__main__":
    app.run(port=8000, debug=True)
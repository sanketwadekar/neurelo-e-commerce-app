# import firebase_admin
# from firebase_admin import firestore

# def update_products_quantities(products_list):
#     db = firestore.client()

#     products_ref = db.collection('products')

#     # Flag to track if all products have sufficient quantities
#     all_products_sufficient = True

#     # Batch for updating multiple documents atomically
#     batch = db.batch()

#     # Iterate over the products in the list
#     for product in products_list:
#         product_id = product['id']
#         required_quantity = product['quantity']

#         # Get the product document
#         product_doc_ref = products_ref.document(product_id)

#         # Fetch the product data
#         product_data = product_doc_ref.get().to_dict()

#         # Check if product exists and has sufficient quantity
#         if product_data and product_data.get('stock', 0) >= required_quantity:
#             # Update the quantity by subtracting the required quantity
#             new_quantity = product_data['stock'] - required_quantity
#             batch.update(product_doc_ref, {'stock': new_quantity})
#         else:
#             # Set flag to False if any product does not have sufficient quantity
#             all_products_sufficient = False
#             less_quantity_product = product_data['title']
#             less_quantity_stock = product_data['stock']
#             break  # Exit loop if any product does not have sufficient quantity

#     # If all products have sufficient quantities, commit the batch update
#     if all_products_sufficient:
#         batch.commit()
#         return {
#             "status": 1
#         }
#     else:
#         return {
#             "status": 0,
#             "title": less_quantity_product,
#             "stock": less_quantity_stock
#         }

from datetime import datetime
import requests
from flask import jsonify
import json

def create_order(api_client, data, user_id):

    current_datetime = datetime.now()

    # Format time datetime as a string
    datetime_string = current_datetime.strftime("%Y-%m-%dT%H:%M:%SZ")

    print("Datetime String:", datetime_string)

    request_data = {
        'products': data['items'],
        'date': datetime_string,
        'user_id': user_id,
        'amount': data['amount']
    }
    print(json.dumps(request_data))
    response = requests.post(api_client['host'] + "/rest/orders/__one", data=json.dumps(request_data), headers = {"X-API-KEY": api_client['key']})
    if response.status_code == 201:
        return True
    else:
        print("Error:", response.status_code)
        return False
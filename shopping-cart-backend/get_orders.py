import requests
import json

def fetch_products_with_ids(api_client, product_ids):
  filter = {
    "id": {
      "in": product_ids
    }
  }
  response = requests.get(api_client['host'] + "/rest/products?filter=" + json.dumps(filter), headers = {"X-API-KEY": api_client['key']})
  if response.status_code == 200:
    return json.loads(response.text)
  else:
    return json.dumps([])

def extract_product_ids(orders):
    product_ids = []
    if orders is not None:
        for order in orders['data']:
            products = order.get('products', [])
            for product in products:
                product = json.loads(product)
                product_ids.append(product.get('id'))
    return product_ids

def get_orders(api_client, user_id):
  filter = {
    "user_id": {
      "equals": user_id
    }
  }
  response = requests.get(api_client['host'] + "/rest/orders?filter=" + json.dumps(filter), headers = {"X-API-KEY": api_client['key']})

  orders = []
  if response.status_code == 200:
    orders = response.json()
    product_ids = extract_product_ids(orders)
    products = fetch_products_with_ids(api_client, product_ids)
  else:
    print("Error:", response.status_code)
  product_dict = {}
  for product in products['data']:
    product_dict[product['id']] = product
  
  return {'orders': orders['data'], 'products': product_dict}


if __name__ == "__main__":
  from client import get_neurelo_client
  print(get_orders(get_neurelo_client(), "66255bb6a8fe8d72ffde76f0"))



  import requests

def fetch_orders(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception for any HTTP error status
        orders = response.json()
        return orders
    except requests.exceptions.RequestException as e:
        print("Error fetching orders:", e)
        return None



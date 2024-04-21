import requests

def get_all_products(api_client):
    response = requests.get(api_client['host'] + "/rest/products", headers = {"X-API-KEY": api_client['key']})

    products = []
    if response.status_code == 200:
        products = response.json()
    else:
        print("Error:", response.status_code)
    return products
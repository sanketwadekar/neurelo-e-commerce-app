import requests

def get_product_by_id(api_client, product_id):
    if product_id is None:
        return None
    response = requests.get(api_client['host'] + "/rest/products/" + product_id, headers = {"X-API-KEY": api_client['key']})

    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code)
    return None
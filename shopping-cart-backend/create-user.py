
import requests
from password import hash_password
import json

def create_user(client, first_name, last_name, username, password):
	data = {
		'first_name': first_name,
		'last_name': last_name,
		'username': username,
		'password': hash_password(password)
	}
	response = requests.post(client['host'] + "/rest/users/__one", headers={'X-API-KEY': client['key']}, data=json.dumps(data))
	if response.status_code == 201:
		print("user created")
	else:
		print("Error: ", response.text)


if __name__ == "__main__":
	from client import get_neurelo_client
	client = get_neurelo_client()
	create_user(client, "john", "doe", 'johnd', 'testpassword')
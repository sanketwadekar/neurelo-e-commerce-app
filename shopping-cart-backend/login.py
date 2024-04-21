
import requests
from password import *
from jwt_token import get_token
import json

def login(client_api, username, password):
	filter = {
		"username": {
			"equals": username
		}
	}
	response = requests.get(client_api['host'] + "/rest/users?filter=" + json.dumps(filter), headers={'X-API-KEY': client_api['key']})
	if response.status_code == 200:
		user = response.json()['data'][0]
	else:
		user = None
	if user is None:
		return False, None
	user_verified = verify_password(password, user['password'])
	if user_verified == False:
		return False, None
	return True, get_token(user['id'], user['username'])


if __name__ == "__main__":
	from client import get_neurelo_client

	print(login(get_neurelo_client(), "abcd", "1234"))
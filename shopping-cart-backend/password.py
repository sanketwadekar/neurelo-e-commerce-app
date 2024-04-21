import bcrypt

# Hash a password
def hash_password(password):
	# Generate a salt
	salt = bcrypt.gensalt()
	# Hash the password with the salt
	hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
	return hashed_password.decode('utf-8')

# Verify a password
def verify_password(password, hashed_password):
	return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

# Example usage
if __name__ == "__main__":
	password = "password123"
	hashed_password = hash_password(password)

	print("Hashed Password:", hashed_password)
	
	# Simulate password verification
	is_verified = verify_password("password123", hashed_password)
	print("Password Verified:", is_verified)

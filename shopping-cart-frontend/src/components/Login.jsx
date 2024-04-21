// LoginPage.js

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Perform login API call and get authentication token
    let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/login`, {
    method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
    body: JSON.stringify({
        username: username,
        password: password
    })}).then(res => res.json());

		if (response.status == 1) {
			localStorage.setItem('token', response.token);
			router.push('/products');
		} else {
			alert("Invalid credentials");
		}
  };

  return (
    <div className='login-container'>
      <div className='text-center h2 bg-black text-white py-2'>Shopping site</div>
      <div className='d-flex flex-column justify-content-center login-container'>
        <div className='mx-auto w-25 p-3 py-5 bg-white'>
          <div className='py-1'>
            <label>Username</label>
            <input className='w-100' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='py-1'>
            <label>Password</label>
            <input className='w-100' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='py-1'>
            <button className='w-100 btn btn-dark' onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

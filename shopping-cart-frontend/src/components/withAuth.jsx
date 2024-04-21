import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false)
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login page if token is not present
        router.push('/login');
      } else {
        setAuthorized(true);
      }
    }, []);

    return (authorized)?<WrappedComponent {...props} />:<></>;
  };

  return AuthComponent;
};

export default withAuth;

import NavBar from './NavBar'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function App(props) {
  const router = useRouter();

  useEffect(() => {
    // Redirect all requests to '/' to '/login'
    if (router.pathname == '/') {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}

export default App;

import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='bg-green-600 text-white font-bold py-2 px-4 '  onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
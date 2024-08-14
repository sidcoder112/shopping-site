
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  

  return (
    <button
      className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white text-white rounded py-2 px-4"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;


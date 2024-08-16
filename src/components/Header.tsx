// Header.tsx
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store'; // Adjust the import path based on your file structure
import LoginButton from '../auth-login/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../auth-login/Profile';
import LogoutButton from '../auth-login/LogoutButton';

interface HeaderProps {
  showCartButton?: boolean;
}

const Header = ({ showCartButton = true }: HeaderProps) => {
  // Use Redux hook to access the cart state
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { isAuthenticated } = useAuth0();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400  p-4 flex space-x-2 justify-between items-center text-white">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-2xl font-bold">
          <h1 className="text-2xl font-sans">Sidharth Store 🏪</h1>
        </Link>
        {isAuthenticated && (
          <Link to="/add-item">
            <button className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-4 py-2  border-solid border-2 border-white rounded hover:bg-blue-700">
              Add Item
            </button>
          </Link>
        )}
        {isAuthenticated && (
          <Link to="/Statistics">
            <button className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-4 py-2  border-solid border-2 border-white rounded hover:bg-blue-700">
              Statistics
            </button>
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {showCartButton && (
          <Link to="/cart">
            <button className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white  border-solid border-2 border-white rounded px-5 py-4">
              Cart ({cart.length})
            </button>
          </Link>
        )}
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <div>
              <Link to="/ProfilePage">
                <Profile />
              </Link>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;



// Header.tsx
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LoginButton from '../auth-login/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../auth-login/Profile';
import LogoutButton from '../auth-login/LogoutButton';

interface HeaderProps {
  showCartButton?: boolean;
}

const Header = ({ showCartButton = true }: HeaderProps) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { isAuthenticated } = useAuth0();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg flex flex-wrap items-center justify-between text-white">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-2xl font-bold">
          <h1 className="text-2xl font-sans">Sidharth Store 🏪</h1>
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/add-item">
              <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 border rounded hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add Item
              </button>
            </Link>
            <Link to="/Statistics">
              <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 border rounded hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Dashboard
              </button>
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {showCartButton && (
          <Link to="/cart">
            <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border rounded px-4 py-2 flex items-center space-x-2">
              <span>Cart ({cart.length})</span>
            </button>
          </Link>
        )}
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Link to="/ProfilePage">
              <Profile />
            </Link>
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

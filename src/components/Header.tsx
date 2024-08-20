import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAuth0 } from '@auth0/auth0-react';
import { FaPlus, FaChartBar } from 'react-icons/fa';
import LoginButton from '../auth-login/LoginButton';
import LogoutButton from '../auth-login/LogoutButton';

interface HeaderProps {
  showCartButton?: boolean;
}

const Header = ({ showCartButton = true }: HeaderProps) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { isAuthenticated, user } = useAuth0();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-between">

        <div className="flex items-center justify-center md:justify-start">
          <Link to="/" className="flex items-center space-x-2">
            <FaShoppingCart className="text-3xl" /> 
            <span className="text-2xl font-thin font-sans tracking-wide">
              Sidharth Store
            </span>
          </Link>
        </div>


        <div className="flex items-center justify-center space-x-4">
          {isAuthenticated && (
            <>
              <Link to="/add-item">
                <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 border rounded flex items-center space-x-2 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <FaPlus />
                  <span>Add Item</span>
                </button>
              </Link>
              <Link to="/Statistics">
                <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-2 border rounded flex items-center space-x-2 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <FaChartBar />
                  <span>Dashboard</span>
                </button>
              </Link>
            </>
          )}
        </div>


        <div className="flex items-center justify-center md:justify-end space-x-4">
          {showCartButton && (
            <Link to="/cart">
              <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border rounded px-4 py-2 flex items-center space-x-2 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <FaShoppingCart />
                <span>Cart ({cart.length})</span>
              </button>
            </Link>
          )}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/ProfilePage" className="flex items-center space-x-2">
                <img src={user?.picture} alt={user?.name} className="w-10 h-10 rounded-full border" />
                <span className="text-lg font-medium font-mono">{user?.name}</span>
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

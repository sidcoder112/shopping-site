import { useEffect } from 'react';
import Header from './Header';
import { useCart } from '../context/ContextCart';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.16;
  const true_total = total + tax;

  
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);


  return (
    <div>
      <Header showCartButton={false} />
      <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
        <div className="border-t border-gray-300 pt-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 pt-4 mt-4">
          <div className="flex justify-between text-lg">
            <p className="font-medium">Subtotal:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg">
            <p className="font-medium">Tax (16%):</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4">
            <p>Total:</p>
            <p>${true_total.toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link to="/cart">
            <button className="text-sm text-blue-500 hover:underline">
              &larr; Go Back to Cart
            </button>
          </Link>
        </div>
        <div className="mt-8 text-center">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600">
            Complete Purchase
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Thank you for shopping with us!</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

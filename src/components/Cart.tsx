import { useCart } from '../context/ContextCart';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.16;
  const true_total = total + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div>
      <Header showCartButton={false} />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="mb-4">
          {cart.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-right font-bold">Tax: ${tax.toFixed(2)}</div>
        <div className="text-right font-bold">Total: ${true_total.toFixed(2)}</div>
        
        <div className="mt-4 flex justify-between">
          <Link to="/">
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Go Home
            </button>
          </Link>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// src/components/Cart.tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import CartItem from './CartItem';
import PromoCodeSection from './PromoCodeSection';
import CartSummary from './CartSummary';
import { getDiscount } from '../utils/promoCodes';
import Footer from './Footer';

const Cart = () => {
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState('Standard Shipping');
  const [error, setError] = useState('');

  const handlePromoCode = () => {
    const discountValue = getDiscount(promoCode);
    if (discountValue > 0) {
      setDiscount(discountValue);
      setError('');
    } else {
      setError('Invalid promo code');
      setDiscount(0);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.16;
  const discountAmount = total * discount;
  const true_total = total + tax - discountAmount;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      navigate('/checkout');
    }
  };

  const isCartEmpty = cart.length === 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header showCartButton={false} />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mb-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
        
        {isCartEmpty ? (
          <p className="text-gray-600">Cart is empty.</p>
        ) : (
          <div className="mb-6">
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                increaseQuantity={() => dispatch(increaseQuantity(item.id))}
                decreaseQuantity={() => dispatch(decreaseQuantity(item.id))}
                removeFromCart={() => dispatch(removeFromCart(item.id))}
              />
            ))}
          </div>
        )}

        <PromoCodeSection
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          handlePromoCode={handlePromoCode}
          error={error}
          discount={discount}
          isCartEmpty={isCartEmpty}
        />

        <div className="mb-6">
          <label htmlFor="shipping" className="block text-gray-700 mb-2">Shipping</label>
          <select
            id="shipping"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            className="border rounded px-4 py-2 w-full"
            disabled={isCartEmpty}
          >
            <option>Standard Shipping</option>
          </select>
        </div>

        <CartSummary
          total={total}
          tax={tax}
          discountAmount={discountAmount}
          true_total={true_total}
        />

        <div className="flex justify-between">
          <Link to="/">
            <button className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700">
              Go Home
            </button>
          </Link>
          <button
            className={`bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 ${isCartEmpty ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            onClick={handleCheckout}
            disabled={isCartEmpty}
          >
            Checkout
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, clearCart } from '../store/cartSlice';
import { RootState } from '../store/store';
import { useAuth0 } from '@auth0/auth0-react';

const CartManager = () => {
  const { isAuthenticated, user } = useAuth0();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (isAuthenticated && user) {
      const userCart = localStorage.getItem(`cart_${user.sub}`);
      if (userCart) {
        dispatch(setCart(JSON.parse(userCart)));
      }
    } else {
      const guestCart = localStorage.getItem('guest_cart');
      if (guestCart) {
        dispatch(setCart(JSON.parse(guestCart)));
      }
    }
  }, [isAuthenticated, user, dispatch]);

 
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`cart_${user.sub}`, JSON.stringify(cart));
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(cart));//not working as planned
    }
  }, [cart, isAuthenticated, user]);

 
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearCart());
    }
  }, [isAuthenticated, dispatch]);

  return null;
};

export default CartManager;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import AddItem from './components/AddItem'; 
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RemoveItem from './components/RemoveItem';
import UpdateItem from './components/UpdateItem';
import NoPage from './components/NoPage';
import ProfilePage from './auth-login/ProfilePage';
import Checkout from './components/Checkout';
import Statistics from './components/Statistics';
import CartManager from './components/CartManager'; 
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Router>
          <CartManager /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-item" element={<AddItem />} /> 
            <Route path="/remove/:id" element={<RemoveItem />} /> 
            <Route path="/update/:id" element={<UpdateItem />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact-us" element={<ContactForm />} />
          </Routes>
        </Router>
      </Provider>
    </PersistGate>
  );
};

export default App;



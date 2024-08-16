import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice'; // Import addToCart action

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number; // quantity field included
}

const ProductDetails = () => {
  const { isAuthenticated } = useAuth0();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct({
          ...response.data,
          quantity: 1, // Set initial quantity to 1 when fetching product details
        });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // Dispatch addToCart action with product
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="mb-60"> 
          <div className="flex flex-col md:flex-row">
            <img src={product?.image} alt={product?.title} className="w-full md:w-1/2 object-contain mb-4 md:mb-0" />
            <div className="md:ml-4 flex-1">
              <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
              <p className="text-gray-500 mb-2">{product?.category}</p>
              <p className="text-gray-900 mb-2">${product?.price.toFixed(2)}</p>
              <p className="text-yellow-500 mb-2">Rating: {product?.rating.rate} ({product?.rating.count} reviews)</p>
              <p className="mb-4">{product?.description}</p>
              <button
                className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleAddToCart} // Use Redux action for adding to cart
              >
                Add to Cart
              </button>
              <div className="flex flex-col mt-4 items-center space-y-2">
                {isAuthenticated && 
                  <div className='flex space-x-5'>
                    <Link to={`/remove/${product?.id}`} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-center">
                      Remove Item
                    </Link>
                    <Link to={`/update/${product?.id}`} className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 text-center">
                      Update Item
                    </Link>
                  </div>
                }
                <Link to="/" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 block mt-8 text-center">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;


/*import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/ContextCart';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number; // Add quantity field
}

const ProductDetails = () => {
  const { isAuthenticated } = useAuth0();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct({
          ...response.data,
          quantity: 1, // Set initial quantity to 1 when fetching product details
        });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="mb-60"> 
          <div className="flex flex-col md:flex-row">
            <img src={product?.image} alt={product?.title} className="w-full md:w-1/2 object-contain mb-4 md:mb-0" />
            <div className="md:ml-4 flex-1">
              <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
              <p className="text-gray-500 mb-2">{product?.category}</p>
              <p className="text-gray-900 mb-2">${product?.price.toFixed(2)}</p>
              <p className="text-yellow-500 mb-2">Rating: {product?.rating.rate} ({product?.rating.count} reviews)</p>
              <p className="mb-4">{product?.description}</p>
              <button
                className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => product && addToCart(product)} // Product now has quantity
              >
                Add to Cart
              </button>
              <div className="flex flex-col mt-4 items-center space-y-2">
                {isAuthenticated && 
                  <div className='flex space-x-5'>
                    <Link to={`/remove/${product?.id}`} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-center">
                      Remove Item
                    </Link>
                    <Link to={`/update/${product?.id}`} className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 text-center">
                      Update Item
                    </Link>
                  </div>
                }
                <Link to="/" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 block mt-8 text-center">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
*/

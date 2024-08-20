import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ProductCard from './ProductCard';  
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetails = () => {
  const { isAuthenticated } = useAuth0();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        const fetchedProduct = response.data;
        setProduct({
          ...fetchedProduct,
          quantity: 1,
        });

        axios
          .get('https://fakestoreapi.com/products/category/' + fetchedProduct.category)
          .then((res) => {
            const products = res.data.filter((p: Product) => p.id !== fetchedProduct.id);
            setRelatedProducts(products.slice(0, 4));
          })
          .catch((error) => console.error('Error fetching related products:', error));
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row mb-40">
            <div className="w-1/2 flex justify-center items-center"> 
              <img
                src={product?.image}
                alt={product?.title}
                className="md:w-[500px] object-cover mb-4 md:mb-0"
              />
            </div>    
            <div className="md:ml-4 flex-1">
              <h1 className="text-2xl font-light text-gray-800 mb-2">{product?.title}</h1>
              <p className="text-gray-500 font-thin mb-2">{product?.category}</p>
              <p className="text-gray-900 font-light mb-2">${product?.price.toFixed(2)}</p>
              <div className="flex items-center mb-2">
                {product && (
                  <div className="flex items-center">
                    {Array(Math.floor(product.rating.rate)).fill(0).map((_, index) => (
                      <FaStar key={index} className="text-yellow-400" />
                    ))}
                    {product.rating.rate % 1 !== 0 && <FaStarHalfAlt className="text-yellow-400" />}
                    {Array(5 - Math.floor(product.rating.rate) - (product.rating.rate % 1 !== 0 ? 1 : 0)).fill(0).map((_, index) => (
                      <FaRegStar key={index} className="text-yellow-400" />
                    ))}
                  </div>
                )}
                <p className="ml-2 text-sm text-gray-500 font-thin">
                  ({product?.rating.count} reviews)
                </p>
              </div>
              <p className="mb-4 font-thin">{product?.description}</p>

              <button
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 shadow-md hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <div className="flex flex-col mt-4 items-center space-y-2">
                {isAuthenticated && product && (
                  <div className="flex space-x-5">
                    <Link
                      to={`/remove/${product.id}`}
                      className="bg-red-300 text-black px-2 py-1 rounded hover:bg-red-400 font-light"
                    >
                      Remove Item
                    </Link>
                    <Link
                      to={`/update/${product.id}`}
                      className="bg-yellow-300 text-black px-2 py-1 rounded hover:bg-yellow-400 font-light"
                    >
                      Update Item
                    </Link>
                  </div>
                )}
                <Link
                  to="/"
                  className="block mt-8 text-center"
                >
                  <button className="group flex h-10 items-center justify-center rounded-md border border-gray-600 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-4 text-neutral-50 shadow-md hover:bg-gradient-to-b hover:from-gray-600 hover:via-gray-600 hover:to-gray-600 active:[box-shadow:none]">
                    <span className="block group-active:translate-y-1">Go Home</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-light text-gray-800 mb-4">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => dispatch(addToCart(product))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;

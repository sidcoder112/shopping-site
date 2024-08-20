
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; 

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const renderStars = () => {
    const fullStars = Math.floor(product.rating.rate);
    const hasHalfStar = product.rating.rate % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, index) => (
          <FaStar key={index} className="text-yellow-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {Array(emptyStars).fill(0).map((_, index) => (
          <FaRegStar key={index} className="text-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <div className="border p-4 rounded shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
      <h2 className="text-lg font-light text-gray-800">
        {product.title.length > 40 ? `${product.title.substring(0, 40)}...` : product.title}
      </h2>
      <p className="text-gray-500 font-thin">{product.category}</p>
      <p className="text-gray-900 font-light">${product.price.toFixed(2)}</p>
      
     
      <div className="flex items-center mt-1 mb-2">
        {renderStars()}
        <p className="ml-2 text-sm text-gray-500 font-thin">
          ({product.rating.count} reviews)
        </p>
      </div>

      <button
        className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(82_82_82)]"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      <div className="flex flex-initial mt-2">
        <Link to={`/product/${product.id}`} className="text-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:underline ml-2 font-light">
          View Details
        </Link>
        {isAuthenticated && (
          <>
            <Link to={`/remove/${product.id}`} className="bg-red-300 text-black px-2 py-1 ml-2 rounded hover:bg-red-400 font-light">
              Remove Item
            </Link>
            <Link to={`/update/${product.id}`} className="bg-yellow-300 text-black px-2 py-1 ml-2 rounded hover:bg-yellow-400 font-light">
              Update Item
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

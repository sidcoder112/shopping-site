

import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}
const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-2" />
      <h2 className="text-lg font-semibold">
        {product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title}
      </h2>
      <p className="text-gray-500">{product.category}</p>
      <p className="text-gray-900">${product.price.toFixed(2)}</p>
      <p className="text-yellow-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
      <button
        className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-2 py-1 hover:bg-blue-600 mt-2"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
      <div className="flex flex-initial mt-2">
        <Link to={`/product/${product.id}`} className="text-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:underline ml-2">
          View Details
        </Link>
        {isAuthenticated && (
          <>
            <Link to={`/remove/${product.id}`} className="bg-red-300 text-blac px-2 py-1 ml-2 rounded hover:bg-red-400">
              Remove Item
            </Link>
            <Link to={`/update/${product.id}`} className="bg-yellow-300 text-black px-2 py-1 ml-2 rounded hover:bg-yellow-400">
              Update Item
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;



// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { removeFromCart } from '../store/cartSlice'; 
// import Header from './Header';
// import Alert from './Alert'; 

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   description: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

// const RemoveItem = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [alertMessage, setAlertMessage] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); 

//   useEffect(() => {
//     axios.get(`https://fakestoreapi.com/products/${id}`)
//       .then(response => {
//         setProduct(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching product details:', error);
//       });
//   }, [id]);

//   const handleDelete = () => {
//     axios.delete(`https://fakestoreapi.com/products/${id}`)
//       .then(() => {
//         dispatch(removeFromCart(Number(id))); 
//         setAlertMessage('Product deleted successfully.');
//         setTimeout(() => {
//           navigate('/');
//         }, 2000); 
//       })
//       .catch(error => {
//         console.error('Error deleting product:', error);
//       });
//   };

//   const handleAlertClose = () => {
//     setAlertMessage(null);
//   };

//   if (!product) {
//     return <div>Product not found.</div>;
//   }

//   return (
//     <div className="relative">
//       <Header />
//       {alertMessage && (
//         <Alert message={alertMessage} onClose={handleAlertClose} />
//       )}
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Remove Item</h1>
//         <div className="flex flex-col md:flex-row mb-4">
//           <img src={product.image} alt={product.title} className="w-full md:w-1/2 object-contain mb-4 md:mb-0" />
//           <div className="md:ml-4">
//             <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
//             <p className="text-gray-500 mb-2">Category: {product.category}</p>
//             <p className="text-gray-900 mb-2">Price: ${product.price.toFixed(2)}</p>
//             <p className="text-yellow-500 mb-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
//             <p className="mb-4">Description: {product.description}</p>
//             <p className="text-red-500 font-bold mb-4">Are you sure you want to delete this item?</p>
//             <button
//               onClick={handleDelete}
//               className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
//             >
//               Delete Item
//             </button>
//             <Link to="/" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-4">
//               Go Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RemoveItem;


import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice'; 
import Header from './Header';
import Alert from './Alert'; 
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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
}

const RemoveItem = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      dispatch(removeFromCart(Number(id)));
      setAlertMessage('Product deleted successfully.');
      setTimeout(() => {
        navigate(`/product/${id}`);
      }, 2000); // Redirect after showing the alert
    } catch (error) {
      console.error('Error deleting product:', error);
      setAlertMessage('Failed to delete the product.');
    }
  };

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="relative">
      <Header />
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleAlertClose} />
      )}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Remove Item</h1>
        <div className="flex flex-col md:flex-row mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 object-contain mb-4 md:mb-0"
          />
          <div className="md:ml-4 flex-1">
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-500 mb-2">Category: {product.category}</p>
            <p className="text-gray-900 mb-2">Price: ${product.price.toFixed(2)}</p>
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
            <p className="mb-4">Description: {product.description}</p>
            <p className="text-red-500 font-bold mb-4">Are you sure you want to delete this item?</p>
            <button
              onClick={handleDelete}
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Delete Item
            </button>
            <Link to={`/product/${id}`} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-4">
              Go to Product
            </Link>
            <Link to="/" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-4">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveItem;

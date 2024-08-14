import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';
const AddItem = () => {

  const navigate = useNavigate();
  const {isAuthenticated}=useAuth0();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(''); 
  const [category, setCategory] = useState('electronics'); 
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
  //conv num
    const numericPrice = parseFloat(price);

  
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    axios.post('https://fakestoreapi.com/products', {
      title,
      price: numericPrice, 
      category,
      description,
      image
    })
    .then((response) => {
      console.log('Item added successfully:', response.data);
      alert('Item added successfully!');
      
    })
    .catch((error) => {
      console.error('Error adding item:', error);
    });
  };
  if (!isAuthenticated) {
    return <Navigate to="*" />;
  }
  return (
   <div>
    <Header />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
            className="border p-2 w-full"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-300 text-black px-4 py-2  hover:bg-orange-500"
        >
          Add Item
        </button>
      </form>
    
        <button onClick={() => navigate('/')} className="bg-indigo-600  text-black px-4 py-2  mt-4" > Go Back</button>
      
    </div>
    </div>
  );
};

export default AddItem;

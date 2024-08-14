
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

interface Item {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

function UpdateItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item>({
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put(`https://fakestoreapi.com/products/${id}`, item)
      .then(response => {
        console.log('Item updated successfully:', response.data);
        alert('Item updated successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div>
      <Header />
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={item.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price:</label>
          <input
            type="text"
            name="price"
            value={item.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category:</label>
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description:</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL:</label>
          <input
            type="text"
            name="image"
            value={item.image}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update</button>
      </form>
      <Link to= "/" className="absolute bottom left-4 mt-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-normal py-2 px-4 rounded"
          >
            Go Home
          </button>
      </Link>
    </div>
    </div>
  );
}

export default UpdateItem;

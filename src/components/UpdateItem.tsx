
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import UpdateItemForm from './UpdateItemForm';

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
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [id]);

  const handleUpdate = (updatedItem: Item) => {
    axios.put(`https://fakestoreapi.com/products/${id}`, updatedItem)
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
        {item ? (
          <UpdateItemForm item={item} onUpdate={handleUpdate} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default UpdateItem;

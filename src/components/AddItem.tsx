
import React, { useState } from 'react';
import { Navigate, } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import ItemForm from './ItemForm';
import { ChangeItem } from './ItemForm'; 
import Notification from './Notification'; 
import { useAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';

const AddItem: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = (formData: ChangeItem) => {
    const numericPrice = parseFloat(formData.price);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      setNotification('Please enter a valid price.');
      return;
    }

    axios.post('https://fakestoreapi.com/products', {
      ...formData,
      price: numericPrice
    })
    .then((response) => {
      console.log('Item added successfully:', response.data);
      setNotification('Item added successfully!');
      
    })
    .catch((error) => {
      console.error('Error adding item:', error);
      setNotification('Failed to add item.');
    });
  };

  if (!isAuthenticated) {
    return <Navigate to="*" />;
  }

  return (
    <div>
      <Header />
      <div className="p-4 mt-4 mb-12">
        <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
        <ItemForm onSubmit={handleSubmit} />
      </div>
      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}
      <Footer/>
    </div>
  );
};

export default AddItem;

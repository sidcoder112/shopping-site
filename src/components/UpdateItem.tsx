
import { useState, useEffect } from 'react';
import { useParams,  } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import ItemForm from './ItemForm';
import { ChangeItem } from './ItemForm'; 
import Notification from './Notification'; 

const UpdateItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ChangeItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [id]);

  const handleUpdate = (updatedItem: ChangeItem) => {
    axios.put(`https://fakestoreapi.com/products/${id}`, updatedItem)
      .then(response => {
        console.log('Item updated successfully:', response.data);
        setNotification('Item updated successfully!');
      
      })
      .catch(error => {
        console.error('Error updating item:', error);
        setNotification('Failed to update item.');
      });
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Update Item</h1>
        {item ? (
          <ItemForm initialData={item} onSubmit={handleUpdate} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}
    </div>
  );
};

export default UpdateItem;


import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import ItemForm from './ItemForm';
import { ChangeItem } from './ItemForm'; 
import { useAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';

const AddItem = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const handleSubmit = (formData: ChangeItem) => {
    const numericPrice = parseFloat(formData.price);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    axios.post('https://fakestoreapi.com/products', {
      ...formData,
      price: numericPrice
    })
    .then((response) => {
      console.log('Item added successfully:', response.data);
      alert('Item added successfully!');
      navigate('/');
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
          <div className='mb-32 '>
            <Header />
            <div className="p-4 mt-4">
              <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
              <ItemForm onSubmit={handleSubmit} />
            </div>
          </div>
         <Footer />
       </div>      
  );
};

export default AddItem;

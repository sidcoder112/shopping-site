import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
interface Rating {
  rate: number;
  count: number;
}

interface Item {
  id: number;
  title: string;
  price: number;
  rating: Rating;
  category: string;
}
function Statistics() {
  const { isAuthenticated } = useAuth0();
  const [data, setData] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Item[]>('https://fakestoreapi.com/products');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (!isAuthenticated) {
   
    return <Navigate to="*" />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-900 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
            Loading
          </div>
        </div>
      </div>
    );
  }
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
  
    <div>
      <Chart 
        data={data} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
    </div>
  );
}

export default Statistics;

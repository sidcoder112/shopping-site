
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
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
  const [realTimeSales, setRealTimeSales] = useState<number>(2451.5);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeSales(() => Math.random() * (4000 - 2000) + 2000);
    }, 4000);


    return () => clearInterval(interval);
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

  const totalItems = data.length;
  const totalPrice = data.reduce((acc, item) => acc + item.price, 0);
  const topCategory = data
    .map((item) => item.category)
    .sort((a, b) =>
      data.filter((item) => item.category === a).length >
      data.filter((item) => item.category === b).length
        ? -1
        : 1
    )[0];

  return (
      <div>
        <Header/>
        <div className="font-sans">
          <div className="bg-gray-700 text-white p-6 mb-8">
            <h1 className="text-3xl font-thin">Dashboard Overview</h1>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-thin">Total Products</h2>
              <p className="text-4xl font-light mt-2">{totalItems}</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-300 text-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-thin">Total Sales</h2>
              <p className="text-4xl font-light mt-2">${totalPrice.toFixed(2)}</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-200 text-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-thin">Top Category</h2>
              <p className="text-4xl font-light mt-2">{topCategory}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-300 text-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-thin">User Growth</h2>
              <p className="text-4xl font-light mt-2">27.8%</p>
              <small className="opacity-70 font-light">Past Month</small>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-pink-300 text-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-thin">Real-time Sales</h2>
              <p className="text-4xl font-light mt-2">${realTimeSales.toFixed(2)}</p>
              <small className="opacity-70 font-light">Last 5 secs</small>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 text-white rounded-lg p-6 shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-thin">Total Reviews</h2>
              <p className="text-4xl font-light mt-2">
                {data.reduce((acc, item) => acc + item.rating.count, 0)}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Chart
              data={data}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
        <Footer />
      </div>  
  );
}

export default Statistics;

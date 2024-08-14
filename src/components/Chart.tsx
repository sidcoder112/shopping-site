import { Line, Bar, Pie } from 'react-chartjs-2'; 
import Header from './Header';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement, 
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement 
);

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

interface ChartProps {
  data: Item[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

function Chart({ data, selectedCategory, setSelectedCategory }: ChartProps) {
  const filteredData = selectedCategory === 'All' ? data : data.filter(item => item.category === selectedCategory);

  const chartData: ChartData<'line' | 'bar'> = {
    labels: filteredData.map(item => item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title),
    datasets: [
      {
        label: 'Price',
        data: filteredData.map(item => item.price),
        borderColor: 'rgba(75, 192, 75, 1)',
        backgroundColor: 'rgba(75, 192, 75, 0.5)',
        tension: 0.1,
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Rating Rate',
        data: filteredData.map(item => item.rating.rate),
        borderColor: 'rgba(255, 99, 71, 1)',
        backgroundColor: 'rgba(255, 99, 71, 0.5)',
        tension: 0.1,
        fill: false,
        yAxisID: 'y1',
      }
    ]
  };

  const pieChartData: ChartData<'pie'> = {
    labels: Array.from(new Set(data.map(item => item.category))),
    datasets: [
      {
        label: 'Number of Reviews',
        data: Array.from(new Set(data.map(item => item.category))).map(
          category => data.filter(item => item.category === category)
                          .reduce((acc, item) => acc + item.rating.count, 0)
        ),
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 75, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 75, 0.5)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const chartOptions: ChartOptions<'line' | 'bar'> = {
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
        
          label: context => `${context.raw}`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: 'rgba(75, 192, 75, 1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: 'rgba(255, 99, 71, 1)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  
  const pieChartOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          
          label: context => `${context.raw}`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="mb-6">
          <label htmlFor="category-select" className="block text-gray-700">Select Category:</label>
          <select
            id="category-select"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="All">All</option>
            {Array.from(new Set(data.map(item => item.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="relative h-[500px] mb-8">
          <Line data={chartData as ChartData<'line'>} options={chartOptions as ChartOptions<'line'>} />
        </div>
        <div className="relative h-[500px] mb-8">
          <Bar data={chartData as ChartData<'bar'>} options={chartOptions as ChartOptions<'bar'>} />
        </div>
        <div className="relative h-[400px] mb-8">
          <Pie data={pieChartData as ChartData<'pie'>} options={pieChartOptions as ChartOptions<'pie'>} />
          <h2 className='text-center text-xl font-semibold mb-6'>No. of Reviews in Each Category</h2>
        </div>
        <Link to="/" className="left-4">
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Chart;

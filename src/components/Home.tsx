import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addToCart } from '../store/cartSlice';
import Carousel from './Carousel';

interface Product {
  image: string;
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [areYouLoading, setAreYouLoading] = useState(true);
  const [featuredImages, setFeaturedImages] = useState<string[]>([]);
  const [featuredProductIds, setFeaturedProductIds] = useState<number[]>([]); 

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;
        setProducts(data);
        setAreYouLoading(false);
        setFeaturedImages(getFeaturedImages(data));
        setFeaturedProductIds(getFeaturedProductIds(data)); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setAreYouLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const getFeaturedImages = (products: Product[]): string[] => {
    const categories = Array.from(new Set(products.map(product => product.category)));
    return categories.map(category => {
      const featuredProduct = products.find(product => product.category === category);
      return featuredProduct ? featuredProduct.image : '';
    });
  };

  const getFeaturedProductIds = (products: Product[]): number[] => {
    const categories = Array.from(new Set(products.map(product => product.category)));
    return categories.map(category => {
      const featuredProduct = products.find(product => product.category === category);
      return featuredProduct ? featuredProduct.id : 0;
    });
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === '' || product.category === category)
    )
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating-asc') return a.rating.rate - b.rating.rate;
      if (sort === 'rating-desc') return b.rating.rate - a.rating.rate;
      return 0;
    });

  if (areYouLoading) {
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

  return (
    <div>
      <Header />
      <div className="p-4 mb-10">
      <div className="mb-10 py-10 px-20">
          <h2 className="text-2xl font-thin mb-4">Featured Products</h2>
          <Carousel images={featuredImages} productIds={featuredProductIds} />
        </div>
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <select className="border p-2 mb-2 sm:mb-0" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <select className="border p-2" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => dispatch(addToCart(product))} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

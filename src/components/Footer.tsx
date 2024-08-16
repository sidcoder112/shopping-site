import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mb-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-start text-white">
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
        <Link to="/about" className="text-lg font-semibold hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-lg font-semibold hover:underline">
          Contact
        </Link>
        <Link to="/faq" className="text-lg font-semibold hover:underline">
          FAQ
        </Link>
      </div>

      <div className="flex flex-col items-start space-y-2 md:space-y-0 md:space-x-4">
        <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Sidharth Store. All rights reserved.</p>
        <p className="text-center md:text-left">Contact us: info@sidharthstore.com</p>
      </div>

      <div className="flex space-x-4">
        <a href="https://facebook.com" target="_blank"  className="hover:underline">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" className="hover:underline">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank"  className="hover:underline">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;

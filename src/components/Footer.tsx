import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
        <div className="p-5">
          <h3 className="font-bold text-xl text-indigo-600">Sidharth Store</h3>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-indigo-600 font-bold">Resources</div>
          <Link className="my-3 block hover:underline" to="/about">About Us</Link>
          <Link className="my-3 block hover:underline" to="/faq">FAQ</Link>
          <Link className="my-3 block hover:underline" to="/contact">Contact</Link>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-indigo-600 font-bold">Support</div>
          <Link className="my-3 block hover:underline" to="/help-center">Help Center</Link>
          <Link className="my-3 block hover:underline" to="/privacy-policy">Privacy Policy</Link>
          <Link className="my-3 block hover:underline" to="/terms">Terms & Conditions</Link>
        </div>
        <div className="p-5">
          <div className="text-sm uppercase text-indigo-600 font-bold">Contact Us</div>
          <p className="my-3 block">Netstratum ,Chalikavattom,Vytilla.</p>
          <a href="mailto:info@sidharthstore.com" className="my-3 block hover:underline">info@sidharthstore.com</a>
        </div>
      </div>

      <div className="bg-gray-100 pt-2">
        <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex space-x-2">
            <a href="https://twitter.com" className="w-6 mx-1" target="_blank">
              <svg className="fill-current text-gray-500 hover:text-indigo-600" width="24" height="24" viewBox="0 0 24 24">
              </svg>
            </a>
            <a href="https://facebook.com" className="w-6 mx-1" target="_blank">
              <svg className="fill-current text-gray-500 hover:text-indigo-600" width="24" height="24" viewBox="0 0 24 24">
              </svg>
            </a>
            <a href="https://instagram.com" className="w-6 mx-1" target="_blank">
              <svg className="fill-current text-gray-500 hover:text-indigo-600" width="24" height="24" viewBox="0 0 24 24">
              </svg>
            </a>
          </div>
          <div className="my-5">&copy; {new Date().getFullYear()} Sidharth Store. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

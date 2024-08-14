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
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          <svg className="w-8 h-8 fill-current text-white hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.499v-9.294H9.645V11.14h3.178V8.652c0-3.155 1.926-4.872 4.741-4.872 1.347 0 2.504.1 2.841.145v3.293l-1.949.001c-1.528 0-1.825.727-1.825 1.792v2.348h3.646l-.475 3.566h-3.171V24h6.219C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          <svg className="w-8 h-8 fill-current text-white hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M23.954 4.569c-.885.39-1.83.654-2.825.774 1.014-.608 1.794-1.574 2.165-2.723-.949.563-2.004.974-3.127 1.195-.896-.956-2.173-1.554-3.591-1.554-2.717 0-4.917 2.202-4.917 4.917 0 .386.045.763.127 1.124-4.083-.205-7.699-2.159-10.123-5.132-.423.728-.666 1.574-.666 2.476 0 1.71.87 3.217 2.19 4.099-.807-.026-1.566-.247-2.229-.616v.062c0 2.386 1.693 4.374 3.946 4.827-.413.111-.848.171-1.296.171-.316 0-.624-.031-.927-.088.631 1.953 2.445 3.376 4.6 3.415-1.683 1.318-3.809 2.106-6.102 2.106-.397 0-.788-.023-1.176-.068 2.179 1.396 4.768 2.212 7.548 2.212 9.055 0 14.004-7.498 14.004-13.986 0-.213-.004-.426-.013-.637.962-.694 1.797-1.562 2.457-2.549z"/>
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
          <svg className="w-8 h-8 fill-current text-white hover:text-pink-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.31 3.608 1.284.975.975 1.222 2.242 1.284 3.608.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.062 1.366-.31 2.633-1.284 3.608-.975.975-2.242 1.222-3.608 1.284-1.265.058-1.645.069-4.849.069s-3.584-.011-4.849-.069c-1.366-.062-2.633-.31-3.608-1.284-.975-.975-1.222-2.242-1.284-3.608-.058-1.265-.069-1.645-.069-4.849s.011-3.584.069-4.849c.062-1.366.31-2.633 1.284-3.608.975-.975 2.242-1.222 3.608-1.284 1.265-.058 1.645-.069 4.849-.069M12 5.838c-3.4 0-6.162 2.762-6.162 6.162 0 3.4 2.762 6.162 6.162 6.162s6.162-2.762 6.162-6.162c0-3.4-2.762-6.162-6.162-6.162zm0 10.162c-2.206 0-4-1.794-4-4 0-2.206 1.794-4 4-4s4 1.794 4 4c0 2.206-1.794 4-4 4zm6.406-10.845c-.796 0-1.443-.647-1.443-1.443 0-.796.647-1.443 1.443-1.443.796 0 1.443.647 1.443 1.443 0 .796-.647 1.443-1.443 1.443z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

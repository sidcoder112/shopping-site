

import ReactDOM from 'react-dom';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-green-500 text-white p-4 rounded shadow-lg max-w-sm w-full">
        <p>{message}</p>
        <button onClick={onClose} className="mt-2 bg-gray-800 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Notification;

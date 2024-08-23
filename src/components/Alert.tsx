
interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="top-4 right-4 z-50 text-white px-6 py-4 border-0 rounded relative bg-purple-500 shadow-lg">
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">Message:</b> {message}
      </span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={onClose}
      >
        <span>×</span>
      </button>
    </div>
  );
};

export default Alert;

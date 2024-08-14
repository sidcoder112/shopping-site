import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1>404 Error</h1>
        <p>Page not found.</p>
        <br />
        <p>
          <Link to="/" className="bg-purple-300">Go back to homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default NoPage;
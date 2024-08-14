
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";
const ProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
 

  return (

    isAuthenticated && (
      <div className="h-full">
        <Header />
        <div className="h-10">        
        <center>
        <div className='w-200 mt-20'>
        <img src={user?.picture} alt={user?.name} />
        </div>
        <div className="font-thin ">
        <h2><strong>Username: </strong> {user?.name}</h2>
        <h2><strong>Email : </strong> {user?.email}</h2>
        </div>
        </center>
        <Link to= "/" className="absolute bottom left-4">
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Home
          </button>
      </Link>
       <Footer />
       </div>
    </div>
      
      
    )
  );
};

export default ProfilePage;
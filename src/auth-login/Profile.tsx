
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
 

  return (
    isAuthenticated && (
      <div>
        
        <div>
        <div className='w-11'>
        <img src={user?.picture} alt={user?.name} />
        </div>
        <div className="font-thin ">
        <h2>{user?.name}</h2>
        </div>
        </div>
        
      </div>
      
      
    )
  );
};

export default Profile;
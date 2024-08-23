import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading Profile Page. please Wait </div>;
  }

  return (
    isAuthenticated && (
      <div className="h-screen flex flex-col">
        <Header />
        <div className="ml-4 mt-4">
          <Link to="/">
          <button className="group flex h-10 items-center justify-center rounded-md border border-gray-600 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#d1d5db] hover:bg-gradient-to-b hover:from-gray-600 hover:via-gray-600 hover:to-gray-600 active:[box-shadow:none]"><span className="block group-active:[transform:translate3d(0,1px,0)]"></span>
              Go Home
            </button>
          </Link>
        </div>
        <div className="flex-1">
          <center>
            <div className="w-200 mt-20">
              <img src={user?.picture} alt={user?.name} />
            </div>
            <div className="font-thin">
              <h2>
                <strong>Username: </strong> {user?.name}
              </h2>
              <h2>
                <strong>Email : </strong> {user?.email}
              </h2>
            </div>
          </center>
        </div>
        <Footer  />
      </div>
    )
  );
};

export default ProfilePage;
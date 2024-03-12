import React, { useContext } from "react";
import { Search, Avatar, Button } from "monday-ui-react-core";
import logo from "../assets/logo.png";
import { UserContext } from "../UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function Header() {
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } =
    useAuth0();
  const { myUser } = useContext(UserContext);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-between m-1 items-center">
      <div className="flex">
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="h-11 mr-3" />
        </Link>
        <div>
          <div>Customer</div>
          <div>Support</div>
        </div>
      </div>
      <div className="w-1/3 flex items-center">
        <Search
          placeholder="Search"
          wrapperClassName="monday-storybook-search_size"
        />
      </div>
      <Button
        onClick={() =>
          isAuthenticated
            ? logout({ returnTo: window.location.origin })
            : loginWithRedirect()
        }
        className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </Button>
      {isAuthenticated && user && (
        <div className="flex gap-4 mr-10">
          <Avatar
            ariaLabel={user?.name}
            size="large"
            src={
              user?.picture ||
              "https://style.monday.com/static/media/person1.de30c8ee.png"
            }
            type="img"
          />
          <div className="flex flex-col">
            <div>{user?.name || user?.email}</div>
            <div>{myUser?.role || "User"}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

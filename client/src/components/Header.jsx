import React from "react";
import { Search, Avatar } from "monday-ui-react-core";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="flex justify-between m-1">
      <div className="flex">
        <img src={logo} alt="Logo" className="h-11 mr-3" />
        <div>
          <div>Customer</div>
          <div>Support</div>
        </div>
      </div>
      <div className="w-2/3 flex items-center">
        <Search
          placeholder="Search"
          wrapperClassName="monday-storybook-search_size"
        />
      </div>
      <div className="flex gap-4 mr-10">
        <Avatar
          ariaLabel="Hadas Fahri"
          size="large"
          src="https://style.monday.com/static/media/person1.de30c8ee.png"
          type="img"
        />
        <div className="flex flex-col">
          <div>Bob</div>
          <div>User</div>
        </div>
      </div>
    </div>
  );
}

export default Header;

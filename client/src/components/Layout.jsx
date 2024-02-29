import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div>
      <Header />
      <div className="flex bg-bg_main_screen absolute bottom-0 w-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

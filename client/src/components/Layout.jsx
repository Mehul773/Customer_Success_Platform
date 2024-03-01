import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div>
      <Header />
      <div className="flex bg-bg_main_screen gap-4 ">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

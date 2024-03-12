import React from "react";
import { Button, Link } from "monday-ui-react-core";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navtigate = useNavigate();
  return (
    <div className="w-44 min-w-44 bg-white rounded-md h-[90vh] mt-2 flex flex-col justify-start items-center gap-1">
      <Button
        kind={Button.kinds.TERTIARY}
        className="w-4/5 mt-3"
        onClick={(e) => {
          e.preventDefault();
          navtigate("/dashboard");
        }}
      >
        <p className="text-left">Dashboard</p>
      </Button>

      <Button
        kind={Button.kinds.TERTIARY}
        className="w-4/5 "
        onClick={(e) => {
          e.preventDefault();
          navtigate("/stackholders");
        }}
      >
        Stackholders
      </Button>
    </div>
  );
}

export default Sidebar;

import React from "react";
import { Button } from "monday-ui-react-core";

function Sidebar() {
  return (
    <div className="w-56 bg-white rounded-md h-[90vh] mt-2 flex flex-col justify-start items-center gap-1">
      <Button className="w-4/5 mt-3">
        <p className="text-left">+ Projects</p>
      </Button>
      <Button kind={Button.kinds.TERTIARY} className="w-4/5 mt-4">
        Projects
      </Button>
      <Button kind={Button.kinds.TERTIARY} className="w-4/5 ">
        Project Managers
      </Button>
      <Button kind={Button.kinds.TERTIARY} className="w-4/5 ">
        Employees
      </Button>
      <Button kind={Button.kinds.TERTIARY} className="w-4/5 ">
        Setting
      </Button>
    </div>
  );
}

export default Sidebar;

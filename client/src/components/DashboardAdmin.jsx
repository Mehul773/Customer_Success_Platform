import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

function DashboardAdmin() {
  const { myUser } = useContext(UserContext);

  return <div>DashboardAdmin</div>;
}

export default DashboardAdmin;

import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";
import DashboardAdmin from "../components/DashboardAdmin";
import DashboardAuditor from "../components/DashboardAuditor";
import DashboardClient from "../components/DashboardClient";
import DashboardPM from "../components/DashboardPM";

function Dashboard() {
  const { myUser } = useContext(UserContext);

  if (!myUser) {
    return <Loader />;
  }

  return (
    <>
      {myUser.role === "Admin" && <DashboardAdmin />}
      {myUser.role === "Auditor" && <DashboardAuditor />}
      {myUser.role === "Client" && <DashboardClient />}
      {myUser.role === "Project Manager" && <DashboardPM />}
    </>
  );
}

export default Dashboard;

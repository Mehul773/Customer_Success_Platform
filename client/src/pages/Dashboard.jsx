import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import CreateProject from "../components/CreateProject";
import DisplayProjects from "../components/DisplayProjects";
import Loader from "../components/Loader";
import { UserContext } from "../UserContext";
import DisplayAuditor from "../components/DisplayAuditor";

function Dashboard() {
  const [fetch, setFetch] = useState(false);
  const [tab, setTab] = useState("Display projects");
  const { isLoading } = useAuth0();
  const { myUser } = useContext(UserContext);

  if (isLoading || !myUser) {
    return <Loader />;
  }

  return (
    <>
      {myUser && (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200  ">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  tab === "Display projects"
                    ? "text-blue-600 border-blue-600  "
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 "
                }`}
                onClick={() => setTab("Display projects")}
              >
                Display projects
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  tab === "Create Project"
                    ? "text-blue-600 border-blue-600  "
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 "
                }`}
                onClick={() => setTab("Create Project")}
              >
                Create Project
              </button>
            </li>
            <li className="me-2">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  tab === "Auditors"
                    ? "text-blue-600 border-blue-600  "
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 "
                }`}
                onClick={() => setTab("Auditors")}
              >
                Auditors
              </button>
            </li>
          </ul>
          {tab === "Display projects" && (
            <DisplayProjects fetch={fetch} setFetch={setFetch} />
          )}
          {tab === "Create Project" && (
            <CreateProject fetch={fetch} setFetch={setFetch} />
          )}
          {tab === "Auditors" && (
            <DisplayAuditor fetch={fetch} setFetch={setFetch} />
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;

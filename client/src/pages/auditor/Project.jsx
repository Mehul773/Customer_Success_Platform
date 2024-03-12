import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

import { UserContext } from "../../UserContext";
import ProjectDetails from "../../components/ProjectDetails";
import Budget from "../../components/Budget";
import Risk from "../../components/Risk";
import Phase from "../../components/Phase";
import Sprint from "../../components/Sprint";
import Stackholder from "../../components/Stackholder";
import AuditHistory from "../../components/AuditHistory";
import OperationalMatrix from "../../components/OperationalMatrix";
import FinancialMatrix from "../../components/FinancialMatrix";
import TechnicalMatrix from "../../components/TechnicalMatrix";
import Loader from "../../components/Loader";
import VersionHistory from "../../components/VersionHistory";
import MyTab from "../../components/MyTab";
import { useAuth0 } from "@auth0/auth0-react";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("Project Details");
  const { myUser } = useContext(UserContext);
  const { isLoading } = useAuth0();

  useEffect(() => {
    async function fetchOneProject() {
      try {
        const response = await axios.get(`/project/fetch-project/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }
    fetchOneProject();
  }, [fetch]);

  if (!project || isLoading || !myUser) {
    return <Loader />;
  }

  // DOWNLOAD PROJECT AS PDF
  const download = async (project_id) => {
    setLoading(true);
    try {
      // Send a POST request to the backend server to convert the URL to PDF
      const response = await axios.get(`/download-pdf/${project_id}`, {
        responseType: "arraybuffer",
      });

      // Convert the array buffer received from the server to a Blob
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Use file-saver to save the PDF file locally
      saveAs(pdfBlob, "output.pdf");
      setLoading(false);
    } catch (error) {
      // Handle errors if any occur during the conversion process
      console.error("Error converting to PDF:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {myUser && (
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200  ">
          <ul className="flex flex-wrap -mb-px">
            <MyTab title={"Project Details"} setTab={setTab} tab={tab} />
            <MyTab title={"Budget"} setTab={setTab} tab={tab} />
            <MyTab title={"Risk Profiling"} setTab={setTab} tab={tab} />
            <MyTab title={"Phases/Milestones"} setTab={setTab} tab={tab} />
            <MyTab title={"Sprint wise detail"} setTab={setTab} tab={tab} />
            <MyTab title={"Stckholder"} setTab={setTab} tab={tab} />
            <MyTab title={"Audit History"} setTab={setTab} tab={tab} />
            <MyTab title={"Version History"} setTab={setTab} tab={tab} />
            <MyTab title={"Escalation Matrix"} setTab={setTab} tab={tab} />
          </ul>
          <hr />
          <div className="flex gap-3 items-center cursor-pointer">
            <h1 className="font-bold">Project Name: {project.project_name}</h1>
            <div onClick={() => download(project._id)}>
              <FaDownload />
            </div>
          </div>
          {tab === "Project Details" && (
            <ProjectDetails project={project} setFetch={setFetch} />
          )}
          {tab === "Budget" && (
            <Budget project={project} setFetch={setFetch} myUser={myUser} />
          )}
          {tab === "Risk Profiling" && (
            <Risk project={project} setFetch={setFetch} myUser={myUser} />
          )}
          {tab === "Phases/Milestones" && (
            <Phase project={project} setFetch={setFetch} myUser={myUser} />
          )}
          {tab === "Sprint wise detail" && (
            <Sprint project={project} setFetch={setFetch} myUser={myUser} />
          )}
          {tab === "Stckholder" && (
            <Stackholder
              project={project}
              setFetch={setFetch}
              myUser={myUser}
            />
          )}
          {tab === "Audit History" && (
            <AuditHistory
              project={project}
              setFetch={setFetch}
              myUser={myUser}
            />
          )}
          {tab === "Version History" && (
            <VersionHistory
              project={project}
              setFetch={setFetch}
              myUser={myUser}
            />
          )}
          {tab === "Escalation Matrix" && (
            <div>
              <OperationalMatrix
                project={project}
                setFetch={setFetch}
                myUser={myUser}
              />
              <hr />
              <FinancialMatrix
                project={project}
                setFetch={setFetch}
                myUser={myUser}
              />
              <hr />
              <TechnicalMatrix
                project={project}
                setFetch={setFetch}
                myUser={myUser}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Project;

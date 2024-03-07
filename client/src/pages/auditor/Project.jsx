import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

import {
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "monday-ui-react-core";
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

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

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

  if (!project) {
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
    <div className="w-full mt-2">
      <TabsContext>
        <TabList>
          <Tab>Project Details</Tab>
          <Tab>Budget</Tab>
          <Tab>Risk Profiling </Tab>
          <Tab>Phases/Milestones </Tab>
          <Tab>Sprint wise detail </Tab>
          <Tab>Stckholder </Tab>
          <Tab>Audit History </Tab>
          <Tab>Version History </Tab>
          <Tab>Escalation Matrix </Tab>
        </TabList>
        <div className="flex gap-3 items-center cursor-pointer">
          <h1 className="font-bold">Project Name: {project.project_name}</h1>
          <div onClick={() => download(project._id)}>
            <FaDownload />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            {/* PROJECT DETAILS COMPONENT  */}
            <ProjectDetails project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* BUDGET COMPONENT  */}
            <Budget project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* RISK PROFILING COMPONENT  */}
            <Risk project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* PHASE PROFILING COMPONENT  */}
            <Phase project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* SPRINT COMPONENT  */}
            <Sprint project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* STCKHOLDER COMPONENT  */}
            <Stackholder project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* AUDIT HISTORY COMPONENT  */}
            <AuditHistory project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* Version HISTORY COMPONENT  */}
            <VersionHistory project={project} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* Escalation Matrix   COMPONENT  */}
            <OperationalMatrix project={project} setFetch={setFetch} />
            <hr />
            <FinancialMatrix project={project} setFetch={setFetch} />
            <hr />
            <TechnicalMatrix project={project} setFetch={setFetch} />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default Project;

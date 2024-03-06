import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Loader,
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

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [fetch, setFetch] = useState(false);
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

  return (
    <div className="w-full">
      <TabsContext>
        <TabList>
          <Tab>Project Details</Tab>
          <Tab>Budget</Tab>
          <Tab>Risk Profiling </Tab>
          <Tab>Phases/Milestones </Tab>
          <Tab>Sprint wise detail </Tab>
          <Tab>Stckholder </Tab>
          <Tab>Audit History </Tab>
          <Tab>Escalation Matrix </Tab>
        </TabList>
        <h1 className="font-bold">Project Name: {project.project_name}</h1>
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

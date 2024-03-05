import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="w-full">
      <TabsContext>
        <TabList>
          <Tab>Project Details</Tab>
          <Tab>Budget</Tab>
          <Tab>Risk Profiling </Tab>
          <Tab>Phases/Milestones </Tab>
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
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default Project;

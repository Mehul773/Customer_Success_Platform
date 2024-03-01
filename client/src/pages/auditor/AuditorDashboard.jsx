import React, { useState } from "react";
import CreateProject from "../../components/CreateProject";
import DisplayProjects from "../../components/DisplayProjects";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";

function AuditorDashboard() {
  const [fetch, setFetch] = useState(false);
  return (
    <div className="w-full">
      AuditorDashboard
      <TabsContext>
        <TabList>
          <Tab>Create Project</Tab>
          <Tab>Display project</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Create ptoject component  */}
            <CreateProject fetch={fetch} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* Display ptoject component  */}
            <DisplayProjects fetch={fetch} setFetch={setFetch} />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default AuditorDashboard;

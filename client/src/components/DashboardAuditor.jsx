import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import CreateProject from "./CreateProject";
import DisplayProjects from "./DisplayProjects";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";
import Loader from "./Loader";

function DashboardAuditor() {
  const [fetch, setFetch] = useState(false);
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      AuditorDashboard
      <TabsContext>
        <TabList>
          <Tab>Display projects</Tab>
          <Tab>Create Project</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Display ptoject component  */}
            <DisplayProjects fetch={fetch} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* Create ptoject component  */}
            <CreateProject fetch={fetch} setFetch={setFetch} />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default DashboardAuditor;

import { Route, Routes } from "react-router-dom";
import "monday-ui-react-core/tokens";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "./App.css";
import AuditorProjects from "./pages/auditor/AuditorProjects";
import AuditorDashboard from "./pages/auditor/AuditorDashboard";
import Layout from "./components/Layout";
import * as myConstants from "./myConstants";

//Set base url of backend
axios.defaults.baseURL = myConstants.BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AuditorDashboard />} />
          <Route path="/auditor/projects" element={<AuditorProjects />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

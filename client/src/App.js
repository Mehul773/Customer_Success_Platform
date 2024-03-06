import { Route, Routes } from "react-router-dom";
import "monday-ui-react-core/tokens";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "./App.css";
import AuditorDashboard from "./pages/auditor/AuditorDashboard";
import Layout from "./components/Layout";
import * as myConstants from "./myConstants";
import Project from "./pages/auditor/Project";
import StackholderPage from "./pages/StackholderPage";

//Set base url of backend
axios.defaults.baseURL = myConstants.BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/projects" element={<AuditorDashboard />} />
          <Route path="/stackholders" element={<StackholderPage />} />
          <Route path="/project/:id" element={<Project />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

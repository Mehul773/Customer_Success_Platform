import { Route, Routes } from "react-router-dom";
import "monday-ui-react-core/tokens";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Layout from "./components/Layout";
import * as myConstants from "./myConstants";
import Project from "./pages/auditor/Project";
import StackholderPage from "./pages/StackholderPage";
import Home from "./pages/Home";
import { UserContextProvider } from "./UserContext";
import Dashboard from "./pages/Dashboard";

//Set base url of backend
axios.defaults.baseURL = myConstants.BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stackholders" element={<StackholderPage />} />
            <Route path="/project/:id" element={<Project />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;

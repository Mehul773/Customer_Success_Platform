import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "./EditProject";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import Loader from "../components/Loader";

function DisplayProjects({ fetch, setFetch, myUser }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/project/${myUser?._id}`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchData();
  }, [fetch]);

  async function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(`/project/delete-project/${id}`);
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
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
        <>
          {myUser && (
            <>
              <div className=" overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Project name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Project Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Scope
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Stack
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects?.length > 0 &&
                      projects?.map((project) => (
                        <tr
                          className="bg-white border-b  hover:bg-gray-50 "
                          key={project._id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {project.project_name}
                          </th>
                          <td className="px-6 py-4">{project.project_desc}</td>
                          <td className="px-6 py-4">{project.project_scope}</td>
                          <td className="px-6 py-4">{project.project_stack}</td>
                          <td className="px-6 py-4 text-right flex gap-2 justify-center items-center">
                            <button onClick={() => download(project._id)}>
                              <FaDownload />
                            </button>
                            <Link to={`/project/${project._id}`}>
                              <FaEye />
                            </Link>
                            {/* EDITPROJECT COMPONENT FOR POP UP  */}
                            {(myUser.role === "Admin" ||
                              myUser.role === "Auditor") && (
                              <>
                                <EditProject
                                  project={project}
                                  setFetch={setFetch}
                                />
                                <button
                                  className="text-red-600"
                                  onClick={() => handleDelete(project._id)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default DisplayProjects;

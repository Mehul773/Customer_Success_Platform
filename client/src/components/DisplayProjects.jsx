import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "./EditProject";
import { Link } from "react-router-dom";

function DisplayProjects({ fetch, setFetch }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/project/display-projects");
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

  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project name
            </th>
            <th scope="col" className="px-6 py-3">
              Stack
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Project manager
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
                <Link to={`/project/${project._id}`}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {project.project_name}
                  </th>
                </Link>
                <td className="px-6 py-4">{project.project_stack}</td>
                <td className="px-6 py-4">{project.project_status}</td>
                <td className="px-6 py-4">{project.project_manager}</td>
                <td className="px-6 py-4 text-right flex gap-2">
                  {/* EDITPROJECT COMPONENT FOR POP UP  */}
                  <EditProject project={project} setFetch={setFetch} />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayProjects;

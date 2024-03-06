import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProject({ project, setFetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    project_id: project._id,
    project_name: project.project_name,
    project_desc: project.project_desc,
    project_scope: project.project_scope,
    project_stack: project.project_stack,
    project_status: project.project_status,
    project_manager: project.project_manager,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function updateProject(e) {
    e.preventDefault();
    try {
      await axios.put("/project/edit-project", formData).then((res) => {
        if (res.status == 200) {
          toast.success("Project Edited successfully ");
          setFetch((prev) => !prev);
          closeModal();
        }
      });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  }

  return (
    <>
      <div
        onClick={openModal}
        className=" bg-opacity-80 text-black p-1 rounded-xl cursor-pointer"
      >
        {/* Edit icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
      {isModalOpen && (
        <div className="fixed top-20 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <form
              className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
              onSubmit={updateProject}
            >
              <div className="text-xl mb-4">Edit Project</div>

              <div className="w-full">
                <label className=" mb-1" htmlFor="project_name">
                  Project Name
                </label>
                <input
                  required
                  type="text"
                  id="project_name"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  className={"w-full border rounded-md py-2 px-3"}
                />
              </div>
              <div className="mb-4">
                <label className=" mb-1" htmlFor="project_desc">
                  Project Description
                </label>
                <textarea
                  id="project_desc"
                  name="project_desc"
                  value={formData.project_desc}
                  onChange={handleChange}
                  className={"w-full border rounded-md py-2 px-3"}
                />
              </div>
              <div className="mb-4 w-full">
                <label className=" mb-1" htmlFor="project_scope">
                  Project Scope
                </label>
                <input
                  required
                  type="text"
                  id="project_scope"
                  name="project_scope"
                  value={formData.project_scope}
                  onChange={handleChange}
                  className={"w-full border rounded-md py-2 px-3"}
                />
              </div>
              <div className="mb-4 w-full">
                <label className=" mb-1" htmlFor="project_stack">
                  Project Stack
                </label>
                <select
                  required
                  type="text"
                  id="project_stack"
                  name="project_stack"
                  value={formData.project_stack}
                  onChange={handleChange}
                  className={"w-full border rounded-md py-2 px-3"}
                >
                  <option value="">Select</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Database">Database</option>
                </select>
              </div>
              <div className="flex justify-center gap-2 w-full">
                <button onClick={closeModal}>Close</button>
                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProject;

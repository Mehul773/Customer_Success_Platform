import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProject = ({ fetch, setFetch }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    project_desc: "",
    project_scope: "",
    project_stack: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/project/create-project", formData).then((res) => {
        if (res.status == 200) {
          setFormData({
            project_name: "",
            project_desc: "",
            project_scope: "",
            project_stack: "",
          });
          toast.success("Project Created successfully ");
          setFetch((prev) => !prev);
        }
      });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="project_name">
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
            <label className="block mb-1" htmlFor="project_desc">
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
          <div className="mb-4">
            <label className="block mb-1" htmlFor="project_scope">
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
          <div className="mb-4">
            <label className="block mb-1" htmlFor="project_stack">
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
              <option value="Fullstack">Fullstack</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Project
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProject;

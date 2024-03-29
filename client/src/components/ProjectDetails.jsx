import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const ProjectDetails = ({ project, setFetch, myUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_id: "",
    project_name: "",
    project_desc: "",
    project_scope: "",
    project_stack: "",
    project_status: "",
    project_manager: "",
  });

  useEffect(() => {
    setIsLoading(true);
    if (project) {
      setFormData((prevState) => ({
        ...prevState,
        project_id: project._id,
        project_name: project.project_name,
        project_desc: project.project_desc,
        project_scope: project.project_scope,
        project_stack: project.project_stack,
        project_status: project.project_status,
        project_manager: project.project_manager,
      }));
    }
    setIsLoading(false);
  }, [project]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await axios.put("/project/edit-project", formData).then((res) => {
        if (res.status == 200) {
          toast.success("Project Edited successfully ");
          setFetch((prev) => !prev);
          setIsLoading(false);
        }
      });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
        setIsLoading(false);
      }
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-md mx-auto p">
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
            className="w-full border rounded-md py-2 px-3"
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
            className="w-full border rounded-md py-2 px-3"
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
            className="w-full border rounded-md py-2 px-3"
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
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Database">Database</option>
            <option value="Fullstack">Fullstack</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="project_status">
            Project Status
          </label>
          <select
            id="project_status"
            name="project_status"
            value={formData.project_status}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
          >
            <option value="">Select </option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
            <option value="On hold">On hold</option>
          </select>
        </div>
        {(myUser?.role === "Admin" || myUser?.role === "Auditor") && (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        )}
      </form>
      ;
    </div>
  );
};

export default ProjectDetails;

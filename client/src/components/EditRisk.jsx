import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditRisk({ risk, setFetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: risk.type,
    description: risk.description,
    severity: risk.severity,
    impact: risk.impact,
    remedialSteps: risk.remedialSteps,
    status: risk.status,
    closureDate: risk.closureDate,
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

  async function updateRisk(e) {
    e.preventDefault();
    try {
      await axios.put(`/risk/edit-risk/${risk._id}`, formData).then((res) => {
        if (res.status === 200) {
          toast.success("Risk Edited successfully ");
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
        <div className="fixed top-60 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={updateRisk}
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
          >
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="type">
                Type
              </label>
              <select
                required
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              >
                <option value="">Select</option>
                <option value="Financial">Financial</option>
                <option value="Operational">Operational</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="External">External</option>
              </select>
            </div>
            <div className="mb-1">
              <label className=" mb-1" htmlFor="description">
                Description
              </label>
              <input
                required
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="severity">
                Severity
              </label>
              <select
                required
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              >
                <option value="">Select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="impact">
                Impact
              </label>
              <select
                required
                id="impact"
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              >
                <option value="">Select</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="remedialSteps">
                Remedial Steps
              </label>
              <textarea
                required
                id="remedialSteps"
                name="remedialSteps"
                value={formData.remedialSteps}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="status">
                Status
              </label>
              <input
                required
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="closureDate">
                Closure Date
              </label>
              <input
                required
                type="date"
                id="closureDate"
                name="closureDate"
                value={formData.closureDate}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <button
                onClick={closeModal}
                className="mx-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditRisk;

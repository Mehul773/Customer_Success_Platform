import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditVersionHistory({ versionHistory, setFetch, project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    no: versionHistory.no,
    type: versionHistory.type,
    change: versionHistory.change,
    changeReason: versionHistory.changeReason,
    createdBy: versionHistory.createdBy,
    revisionDate: versionHistory.revisionDate,
    approvalDate: versionHistory.approvalDate,
    approvedBy: versionHistory.approvedBy,
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

  async function updateVersionHistory(e) {
    e.preventDefault();
    try {
      await axios
        .put(
          `/versionHistory/edit-versionHistory/${project._id}/${versionHistory._id}`,
          formData
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Version history Edited successfully ");
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={updateVersionHistory}
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
          >
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="no">
                Version
              </label>
              <input
                required
                type="number"
                min={0}
                id="no"
                name="no"
                value={formData.no}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="type">
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
                <option value="Scope">Scope</option>
                <option value="Project Stack">Project Stack</option>
                <option value="Escalation Matrix">Escalation Matrix</option>
                <option value="Phases">Phases</option>
                <option value="Detailed timeline">Detailed timeline</option>
                <option value="Approved Team">Approved Team</option>
                <option value="Resources">Resources</option>
                <option value="Stakeholders">Stakeholders</option>
                <option value="Risk Profiling">Risk Profiling</option>
                <option value="Sprint-wise detail">Sprint-wise detail</option>
              </select>
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="change">
                Change
              </label>
              <input
                required
                id="change"
                type="text"
                name="change"
                value={formData.change}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="changeReason">
                Change Reason
              </label>
              <input
                required
                id="changeReason"
                type="text"
                name="changeReason"
                value={formData.changeReason}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="createdBy">
                Created By
              </label>
              <input
                required
                id="createdBy"
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="revisionDate">
                Revision Date
              </label>
              <input
                required
                type="date"
                id="revisionDate"
                name="revisionDate"
                value={formData.revisionDate}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="approvalDate">
                Approval Date
              </label>
              <input
                required
                type="date"
                id="approvalDate"
                name="approvalDate"
                value={formData.approvalDate}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className="mb-2 " htmlFor="approvedBy">
                Approved By
              </label>
              <input
                required
                id="approvedBy"
                type="text"
                name="approvedBy"
                value={formData.approvedBy}
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

export default EditVersionHistory;

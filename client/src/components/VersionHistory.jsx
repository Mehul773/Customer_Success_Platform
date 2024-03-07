import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Loader } from "monday-ui-react-core";
import EditVersionHistory from "./EditVersionHistory";

function VersionHistory({ project, setFetch }) {
  const [formData, setFormData] = useState({
    no: "",
    type: "",
    change: "",
    changeReason: "",
    createdBy: "",
    revisionDate: "",
    approvalDate: "",
    approvedBy: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  if (!project) {
    return <Loader color="var(--primary-color)" size={64} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/versionHistory/create-versionHistory/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Version History Created successfully ");
            setFetch((prev) => !prev);
            setFormData({
              no: "",
              type: "",
              change: "",
              changeReason: "",
              createdBy: "",
              revisionDate: "",
              approvalDate: "",
              approvedBy: "",
            });
            closeModal();
          }
        });
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  async function handleDelete(versionHistory_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/versionHistory/delete-versionHistory/${project._id}/${versionHistory_id}`
        );
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Function to format the date to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  return (
    <>
      {/* POP UP FOR ADD AUDIT HISTORY  */}
      <Button onClick={openModal} className="m-2">
        + Add Version history
      </Button>
      {isModalOpen && (
        <div className="fixed top-40 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
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
      {/* TABLE FOR DISPLAY AUDIT HISTORY  */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Version
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Change
            </th>
            <th scope="col" className="px-6 py-3">
              Change Reason
            </th>
            <th scope="col" className="px-6 py-3">
              Created By
            </th>
            <th scope="col" className="px-6 py-3">
              Revision Date
            </th>
            <th scope="col" className="px-6 py-3">
              Approval Date
            </th>
            <th scope="col" className="px-6 py-3">
              Approved By
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_version_history?.length > 0 &&
            project?.project_version_history?.map((versionHistory) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={versionHistory._id}
              >
                <th className="px-6 py-4  ">{versionHistory.no}</th>
                <th className="px-6 py-4  ">{versionHistory.type}</th>
                <th className="px-6 py-4  ">{versionHistory.change}</th>
                <th className="px-6 py-4  ">{versionHistory.changeReason}</th>
                <th className="px-6 py-4  ">{versionHistory.createdBy}</th>
                <th className="px-6 py-4  ">
                  {formatDate(versionHistory.revisionDate)}
                </th>
                <th className="px-6 py-4  ">
                  {formatDate(versionHistory.approvalDate)}
                </th>
                <th className="px-6 py-4  ">{versionHistory.approvedBy}</th>

                <td className="px-6 py-4 text-right flex gap-2">
                  {/* EDITSPRINT COMPONENT FOR POP UP  */}
                  <EditVersionHistory
                    versionHistory={versionHistory}
                    setFetch={setFetch}
                    project={project}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(versionHistory._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default VersionHistory;

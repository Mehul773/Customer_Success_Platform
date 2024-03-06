import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditRisk from "./EditRisk";

function Risk({ project, setFetch }) {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    severity: "",
    impact: "",
    remedialSteps: "",
    status: "",
    closureDate: "",
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
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/risk/create-risk/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Risk Profile Created successfully ");
            setFetch((prev) => !prev);
            setFormData({
              type: "",
              description: "",
              severity: "",
              impact: "",
              remedialSteps: "",
              status: "",
              closureDate: "",
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

  async function handleDelete(risk_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/risk/delete-risk/${project._id}/${risk_id}`
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
      {/* POP UP FOR ADD RISK  */}
      <Button onClick={openModal} className="m-2">
        + Add Risk
      </Button>

      {isModalOpen && (
        <div className="fixed top-60 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
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

      {/* TABLE FOR DISPLAY RISK  */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Risk Type
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Severity
            </th>
            <th scope="col" className="px-6 py-3">
              Impact
            </th>
            <th scope="col" className="px-6 py-3">
              Remedial Steps
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Closure Date
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_risks?.length > 0 &&
            project?.project_risks?.map((risk) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={risk._id}
              >
                <th className="px-6 py-4  ">{risk.type}</th>
                <th className="px-6 py-4  ">{risk.description}</th>
                <th className="px-6 py-4  ">{risk.severity}</th>
                <th className="px-6 py-4  ">{risk.impact}</th>
                <th className="px-6 py-4  ">{risk.remedialSteps}</th>
                <th className="px-6 py-4  ">{risk.status}</th>
                <th className="px-6 py-4  ">{formatDate(risk.closureDate)}</th>

                <td className="px-6 py-4 text-right flex gap-2">
                  {/* EDITRISK COMPONENT FOR POP UP  */}
                  <EditRisk risk={risk} setFetch={setFetch} />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(risk._id)}
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

export default Risk;

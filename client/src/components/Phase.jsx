import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditPhase from "./EditPhase";

function Phase({ project, setFetch, myUser }) {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    completionDate: "",
    approvalDate: "",
    status: "",
    revisedCompletionDate: "",
    comments: "",
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
    console.log(formData.startDate, formData.completionDate);
    if (formData.startDate > formData.completionDate) {
      toast.error("Start date should be less or qual completional date");
      return;
    }
    if (formData.startDate > formData.revisedCompletionDate) {
      toast.error("Start date should be less or qual revised Completion Date ");
      return;
    }
    try {
      await axios
        .post(`/phase/create-phase/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Phase Created successfully ");
            setFetch((prev) => !prev);
            setFormData({
              title: "",
              startDate: "",
              completionDate: "",
              approvalDate: "",
              status: "",
              revisedCompletionDate: "",
              comments: "",
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

  async function handleDelete(phase_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/phase/delete-phase/${project._id}/${phase_id}`
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
      {myUser && (
        <>
          {/* POP UP FOR ADD RISK  */}
          {(myUser?.role === "Admin" || myUser?.role === "PM") && (
            <Button onClick={openModal} className="m-2">
              + Add Phase
            </Button>
          )}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
              >
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="title">
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    required
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="completionDate">
                    Completion Date
                  </label>
                  <input
                    required
                    type="date"
                    id="completionDate"
                    name="completionDate"
                    value={formData.completionDate}
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
                  <label className="mb-2 " htmlFor="status">
                    Status
                  </label>
                  <select
                    required
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  >
                    <option value="">Select</option>
                    <option value="Delayed">Delayed</option>
                    <option value="On-time">On-time</option>
                    <option value="Sign-off Pending">Sign-off Pending</option>
                    <option value="Sign-off">Sign-off</option>
                  </select>
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="revisedCompletionDate">
                    Revised Completion Date
                  </label>
                  <input
                    required
                    type="date"
                    id="revisedCompletionDate"
                    name="revisedCompletionDate"
                    value={formData.revisedCompletionDate}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="comments">
                    Comments
                  </label>
                  <input
                    required
                    type="text"
                    id="comments"
                    name="comments"
                    value={formData.comments}
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
          {/* TABLE FOR DISPLAY PHASE  */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Completion Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Approval Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Revised Completion Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {project?.project_phases?.length > 0 &&
                project?.project_phases?.map((phase) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 "
                    key={phase._id}
                  >
                    <th className="px-6 py-4  ">{phase.title}</th>
                    <th className="px-6 py-4  ">
                      {formatDate(phase.startDate)}
                    </th>
                    <th className="px-6 py-4  ">
                      {formatDate(phase.completionDate)}
                    </th>
                    <th className="px-6 py-4  ">
                      {formatDate(phase.approvalDate)}
                    </th>
                    <th className="px-6 py-4  ">{phase.status}</th>
                    <th className="px-6 py-4  ">
                      {formatDate(phase.revisedCompletionDate)}
                    </th>
                    <th className="px-6 py-4  ">{phase.comments}</th>

                    {(myUser?.role === "Admin" || myUser?.role === "PM") && (
                      <td className="px-6 py-4 text-right flex gap-2">
                        {/* EDITPHASE COMPONENT FOR POP UP  */}
                        <EditPhase phase={phase} setFetch={setFetch} />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(phase._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default Phase;

import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import Loader from "./Loader";
import EditClientFeedback from "./EditClientFeedback";

function ClientFeedback({ project, setFetch, myUser }) {
  const [formData, setFormData] = useState({
    type: "",
    dateReceived: new Date().toJSON(),
    feedback: "",
    actionTaken: "",
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
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios
        .post(`/clientFeedback/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setFetch((prev) => !prev);
            setFormData({
              type: "",
              feedback: "",
              actionTaken: "",
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

  async function handleDelete(clientFeedback_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/clientFeedback/${project._id}/${clientFeedback_id}`
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
          {(myUser?.role === "Client" || myUser.role === "Admin") && (
            <Button onClick={openModal} className="m-2">
              + Add Feedback
            </Button>
          )}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
              >
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="type">
                    Feedback type
                  </label>
                  <select
                    required
                    type="text"
                    min={0}
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  >
                    <option value="">Select</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Appreciation">Appreciation</option>
                  </select>
                </div>

                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="feedback">
                    Detailed Feedback
                  </label>
                  <input
                    required
                    type="text"
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="actionTaken">
                    Action Taken
                  </label>
                  <input
                    required
                    type="text"
                    id="actionTaken"
                    name="actionTaken"
                    value={formData.actionTaken}
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
          {/* TABLE FOR DISPLAY PHASE  */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Feedback Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Received
                </th>
                <th scope="col" className="px-6 py-3">
                  Detailed Feedback
                </th>
                <th scope="col" className="px-6 py-3">
                  Action Taken
                </th>
                <th scope="col" className="px-6 py-3">
                  Closure Date
                </th>
              </tr>
            </thead>
            <tbody>
              {project?.project_clientFeedback?.length > 0 &&
                project?.project_clientFeedback?.map((myClientFeedback) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 "
                    key={myClientFeedback._id}
                  >
                    {myClientFeedback.type === "Complaint" && (
                      <th className="px-6 py-4 text-red-500">
                        {myClientFeedback.type}
                      </th>
                    )}
                    {myClientFeedback.type === "Appreciation" && (
                      <th className="px-6 py-4 text-green-500">
                        {myClientFeedback.type}
                      </th>
                    )}
                    <th className="px-6 py-4  ">
                      {formatDate(myClientFeedback.dateReceived)}
                    </th>
                    <th className="px-6 py-4  ">{myClientFeedback.feedback}</th>
                    <th className="px-6 py-4  ">
                      {myClientFeedback.actionTaken}
                    </th>
                    <th className="px-6 py-4  ">
                      {formatDate(myClientFeedback.closureDate)}
                    </th>
                    {(myUser?.role === "Admin" ||
                      myUser?.role === "Client") && (
                      <td className="px-6 py-4 text-right flex gap-2">
                        {/* EDITRESOURCE COMPONENT FOR POP UP  */}
                        <EditClientFeedback
                          clientFeedback={myClientFeedback}
                          setFetch={setFetch}
                        />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(myClientFeedback._id)}
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

export default ClientFeedback;

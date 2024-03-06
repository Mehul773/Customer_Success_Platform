import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditSprint from "./EditSprint";

function Sprint({ project, setFetch }) {
  const [formData, setFormData] = useState({
    sprint: "asdad",
    startDate: "",
    endDate: "",
    status: "asdad",
    comments: "asdad",
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
        .post(`/sprint/create-sprint/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Sprint Created successfully ");
            setFetch((prev) => !prev);
            setFormData({
              sprint: "",
              startDate: "",
              endDate: "",
              status: "",
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

  async function handleDelete(sprint_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/sprint/delete-sprint/${project._id}/${sprint_id}`
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
        + Add Phase
      </Button>
      {isModalOpen && (
        <div className="fixed top-40 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
          >
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="sprint">
                Sprint
              </label>
              <input
                required
                type="number"
                min={0}
                id="sprint"
                name="sprint"
                value={formData.sprint}
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
              <label className=" mb-1" htmlFor="endDate">
                End Date
              </label>
              <input
                required
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
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
              Sprint
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_sprints?.length > 0 &&
            project?.project_sprints?.map((mySprint) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={mySprint._id}
              >
                <th className="px-6 py-4  ">{mySprint.sprint}</th>
                <th className="px-6 py-4  ">
                  {formatDate(mySprint.startDate)}
                </th>
                <th className="px-6 py-4  ">{formatDate(mySprint.endDate)}</th>
                <th className="px-6 py-4  ">{mySprint.status}</th>
                <th className="px-6 py-4  ">{mySprint.comments}</th>

                <td className="px-6 py-4 text-right flex gap-2">
                  {/* EDITSPRINT COMPONENT FOR POP UP  */}
                  <EditSprint sprint={mySprint} setFetch={setFetch} />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(mySprint._id)}
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

export default Sprint;

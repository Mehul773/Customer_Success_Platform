import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import Loader from "./Loader";
import EditProjectUpdate from "./EditProjectUpdate";

function ProjectUpdate({ project, setFetch, myUser }) {
  const [formData, setFormData] = useState({
    date: "",
    updates: "",
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
    if (formData.startDate > formData.endDate) {
      toast.error("Start date should be less or qual completional date");
      return;
    }
    try {
      await axios
        .post(`/projectUpdate/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setFetch((prev) => !prev);
            setFormData({
              date: "",
              updates: "",
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

  async function handleDelete(projectUpdate_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/projectUpdate/${project._id}/${projectUpdate_id}`
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
              + Add Project Update
            </Button>
          )}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
              >
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="date">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="updates">
                    General Updates
                  </label>
                  <input
                    required
                    type="text"
                    id="updates"
                    name="updates"
                    value={formData.updates}
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
          {/* TABLE FOR DISPLAY PROJECT UPDATE  */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  General Update
                </th>
              </tr>
            </thead>
            <tbody>
              {project?.project_projectUpdates?.length > 0 &&
                project?.project_projectUpdates?.map((myProjectUpdate) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 "
                    key={myProjectUpdate._id}
                  >
                    <th className="px-6 py-4  ">
                      {formatDate(myProjectUpdate.date)}
                    </th>
                    <th className="px-6 py-4  ">{myProjectUpdate.updates}</th>
                    {(myUser?.role === "Admin" || myUser?.role === "PM") && (
                      <td className="px-6 py-4 text-right flex gap-2">
                        {/* EDITRESOURCE COMPONENT FOR POP UP  */}
                        <EditProjectUpdate
                          projectUpdate={myProjectUpdate}
                          setFetch={setFetch}
                        />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(myProjectUpdate._id)}
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

export default ProjectUpdate;

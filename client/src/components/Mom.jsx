import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import Loader from "./Loader";
import EditMom from "./EditMom";

function Mom({ project, setFetch, myUser }) {
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    link: "",
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
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/mom/${project._id}`, formData).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setFetch((prev) => !prev);
          setFormData({
            date: "",
            duration: "",
            link: "",
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

  async function handleDelete(mom_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(`/mom/${project._id}/${mom_id}`);
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
              + Add Mom
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
                  <label className=" mb-1" htmlFor="duration">
                    Duration
                  </label>
                  <input
                    required
                    type="text"
                    min={0}
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>

                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="link">
                    MoM Link
                  </label>
                  <input
                    required
                    type="text"
                    min={0}
                    id="link"
                    name="link"
                    value={formData.link}
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
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  MoM Link
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {project?.project_mom?.length > 0 &&
                project?.project_mom?.map((myMom) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 "
                    key={myMom._id}
                  >
                    <th className="px-6 py-4  ">{formatDate(myMom.date)}</th>
                    <th className="px-6 py-4  ">{myMom.duration}</th>
                    <th className="px-6 py-4  ">{myMom.link}</th>
                    <th className="px-6 py-4  ">{myMom.comments}</th>

                    {(myUser?.role === "Admin" || myUser?.role === "PM") && (
                      <td className="px-6 py-4 text-right flex gap-2">
                        {/* EDITRESOURCE COMPONENT FOR POP UP  */}
                        <EditMom mom={myMom} setFetch={setFetch} />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(myMom._id)}
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

export default Mom;

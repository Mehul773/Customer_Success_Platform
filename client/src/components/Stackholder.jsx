import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditStackholder from "./EditStackholder";

function Stackholder({ project, setFetch }) {
  const [formData, setFormData] = useState({
    role: "PM",
    name: "Mehul",
    contact: "abc@gmail.com",
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
        .post(`/stackholder/create-stackholder/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Sprint Created successfully ");
            setFetch((prev) => !prev);
            setFormData({
              role: "",
              name: "",
              contact: "",
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

  async function handleDelete(stackholder_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/stackholder/delete-stackholder/${project._id}/${stackholder_id}`
        );
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      {/* POP UP FOR ADD RISK  */}
      <Button onClick={openModal} className="m-2">
        + Add Stackholder
      </Button>
      {isModalOpen && (
        <div className="fixed top-40 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
          >
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="role">
                Role
              </label>
              <select
                required
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              >
                <option value="">Select</option>
                <option value="PM">PM</option>
                <option value="Client">Client</option>
                <option value="Account Manager">Account Manager</option>
              </select>
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="name">
                Name
              </label>
              <input
                required
                type="string"
                min={0}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="contact">
                Email
              </label>
              <input
                required
                type="email"
                id="contact"
                name="contact"
                value={formData.contact}
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
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Contact (Email)
            </th>
          </tr>
        </thead>
        <tbody>
          {project?.project_stackholder?.length > 0 &&
            project?.project_stackholder?.map((stackholder) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={stackholder._id}
              >
                <th className="px-6 py-4  ">{stackholder.role}</th>
                <th className="px-6 py-4  ">{stackholder.name}</th>
                <th className="px-6 py-4  ">{stackholder.contact}</th>
                <td className="px-6 py-4 text-right flex gap-2">
                  {/* EDITSPRINT COMPONENT FOR POP UP  */}
                  <EditStackholder
                    stackholder={stackholder}
                    setFetch={setFetch}
                  />
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(stackholder._id)}
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

export default Stackholder;

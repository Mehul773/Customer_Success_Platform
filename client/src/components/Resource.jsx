import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import Loader from "./Loader";
import EditResource from "./EditResource";

function Resource({ project, setFetch, myUser }) {
  const [formData, setFormData] = useState({
    resourceName: "",
    role: "",
    startDate: "",
    endDate: "",
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
    if (formData.startDate > formData.endDate) {
      toast.error("Start date should be less or qual completional date");
      return;
    }
    try {
      await axios.post(`/resource/${project._id}`, formData).then((res) => {
        if (res.status === 200) {
          toast.success("Resource Created successfully ");
          setFetch((prev) => !prev);
          setFormData({
            resourceName: "",
            role: "",
            startDate: "",
            endDate: "",
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

  async function handleDelete(resource_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/resource/${project._id}/${resource_id}`
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
              + Add Resource
            </Button>
          )}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
              >
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="resourceName">
                    Resource
                  </label>
                  <input
                    required
                    type="text"
                    min={0}
                    id="resourceName"
                    name="resourceName"
                    value={formData.resourceName}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="role">
                    Role
                  </label>
                  <input
                    required
                    type="text"
                    min={0}
                    id="role"
                    name="role"
                    value={formData.role}
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
                  Resource
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {project?.project_resources?.length > 0 &&
                project?.project_resources?.map((myResource) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 "
                    key={myResource._id}
                  >
                    <th className="px-6 py-4  ">{myResource.resourceName}</th>
                    <th className="px-6 py-4  ">{myResource.role}</th>
                    <th className="px-6 py-4  ">
                      {formatDate(myResource.startDate)}
                    </th>
                    <th className="px-6 py-4  ">
                      {formatDate(myResource.endDate)}
                    </th>
                    <th className="px-6 py-4  ">{myResource.comments}</th>

                    {(myUser?.role === "Admin" || myUser?.role === "PM") && (
                      <td className="px-6 py-4 text-right flex gap-2">
                        {/* EDITRESOURCE COMPONENT FOR POP UP  */}
                        <EditResource
                          resource={myResource}
                          setFetch={setFetch}
                        />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(myResource._id)}
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

export default Resource;

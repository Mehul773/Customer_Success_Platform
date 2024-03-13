import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditStackholder from "./EditStackholder";
import { MdEmail } from "react-icons/md";
import Loader from "../components/Loader";

function Stackholder({ project, setFetch }) {
  const [loading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    contact: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.post(`/user-by-role`, formData);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }
    fetchUsers();
  }, [formData.role]);

  if (loading) {
    return <Loader />;
  }
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
        .put(`/user/assign-project/${project._id}/${selectedUser._id}`)
        .then((res) => {
          if (res.status === 200) {
            toast.success("stackholder assign to project successfully ");
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
          `/user/${project._id}/${stackholder_id}`
        );
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleEmail() {
    try {
      setIsLoading(true);
      const response = await axios.get(`/send-mail/${project._id}`);
      toast.success(response.data.message);
      setFetch((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex ">
        {/* POP UP FOR ADD RISK  */}
        <Button onClick={openModal} className="m-2">
          + Add Stackholder
        </Button>
        <Button className="m-2" color="positive" onClick={handleEmail}>
          <div className="mx-2">
            <MdEmail />
          </div>
          Send project details to all cilent
        </Button>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
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
              </select>
            </div>
            <div className="mb-1 w-full">
              <label className=" mb-1" htmlFor="contact">
                Email
              </label>
              <select
                required
                type="email"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedUser(
                    users.find((user) => user.email === e.target.value)
                  );
                }}
                className="w-full border rounded-md py-2 px-3"
              >
                <option value="">Select</option>
                {users.map((user) => (
                  <option value={user.email} key={user._id}>
                    {user.email}
                  </option>
                ))}
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
                value={selectedUser?.name || formData.name}
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
          {project?.project_users?.length > 0 &&
            project?.project_users?.map((stackholder) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={stackholder._id}
              >
                <th className="px-6 py-4  ">{stackholder.role}</th>
                <th className="px-6 py-4  ">{stackholder.name}</th>
                <th className="px-6 py-4  ">{stackholder.email}</th>
                <td className="px-6 py-4 text-right flex gap-2">
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

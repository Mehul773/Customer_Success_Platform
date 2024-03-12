import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { UserContext } from "../UserContext";
import Loader from "../components/Loader";
import { Button } from "monday-ui-react-core";
import { toast } from "react-toastify";
import EditUser from "../components/EditUser";

function StackholderPage() {
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading } = useAuth0();
  const { myUser } = useContext(UserContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/user`, formData).then((res) => {
        if (res.status === 200) {
          toast.success("User Created successfully ");
          setFetch((prev) => !prev);
          setFormData({
            role: "",
            name: "",
            email: "",
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

  async function handleDelete(user_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(`/user/${user_id}`);
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`/users`);
        if (response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUsers();
  }, [fetch]);

  if (isLoading || !myUser) {
    return <Loader />;
  }

  return (
    <>
      {isModalOpen && myUser && (
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
                {(myUser.role === "Admin" || myUser.role === "Auditor") && (
                  <option value="PM">Project Manager</option>
                )}
                <option value="Client">Client</option>
                {myUser.role === "Admin" && (
                  <option value="Auditor">Auditor</option>
                )}
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
              <label className=" mb-1" htmlFor="email">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
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
      {myUser && (
        <div className="flex gap-2 flex-col">
          {(myUser?.role === "Admin" || myUser?.role === "Auditor") && (
            <div>
              <Button onClick={openModal} className="m-2">
                + Add user
              </Button>
            </div>
          )}
          <div>
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs  uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 "
                    key={user._id}
                  >
                    <td className="px-6 py-4  ">{user.name}</td>
                    <td className="px-6 py-4  ">{user.role}</td>
                    <td className="px-6 py-4  ">{user.email}</td>
                    {myUser?.role === "Admin" && (
                      <td className="px-6 py-4 text-right flex gap-2">
                        {/* EDITUSER COMPONENT FOR POP UP  */}
                        <EditUser
                          user={user}
                          setFetch={setFetch}
                          myUser={myUser}
                        />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}

                    {myUser?.role === "Auditor" &&
                    (user.role === "Client" || user.role === "PM") ? (
                      <td className="px-6 py-4 text-right flex gap-2">
                        {/* EDITUSER COMPONENT FOR POP UP  */}
                        <EditUser
                          user={user}
                          setFetch={setFetch}
                          myUser={myUser}
                        />
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default StackholderPage;

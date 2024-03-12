import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import EditBudget from "./EditBudget";

const Budget = ({ project, setFetch, myUser }) => {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    budgetedHours: "",
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
    console.log("LOading...");
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`/budget/create-budget/${project._id}`, formData)
        .then((res) => {
          if (res.status === 200) {
            setFetch((prev) => !prev);
            toast.success("Budget Created successfully ");
            setFormData({
              type: "",
              duration: "",
              budgetedHours: "",
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

  async function handleDelete(budget_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(
          `/budget/delete-budget/${project._id}/${budget_id}`
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
      {myUser && (
        <>
          {/* POP UP FOR ADD BUDGET  */}
          {(myUser.role === "Admin" || myUser.role === "Auditor") && (
            <>
              <Button onClick={openModal} className="m-2">
                + Add budget
              </Button>
            </>
          )}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-2"
              >
                <div className="mb-4 w-full">
                  <label className="mb-2 block" htmlFor="type">
                    Type
                  </label>
                  <select
                    required
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3 "
                  >
                    <option value="">Select </option>
                    <option value="Fixed Budget">Fixed Budget </option>
                    <option value="Monthly">Monthly </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="duration">
                    Duration
                  </label>
                  <input
                    required
                    type="number"
                    id="duration"
                    name="duration"
                    min="0"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="budgetedHours">
                    Budgeted Hours
                  </label>
                  <input
                    required
                    type="number"
                    id="budgetedHours"
                    name="budgetedHours"
                    value={formData.budgetedHours}
                    min="0"
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div>
                  <Button
                    onClick={closeModal}
                    className="mx-2 "
                    color="negative"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TABLE FOR DISPLAY BUDGET  */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Budgeted Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {project?.project_budget?.length > 0 &&
                project?.project_budget?.map((budget) => (
                  <tr
                    className="bg-white border-b  hover:bg-gray-50 "
                    key={budget._id}
                  >
                    <th className="px-6 py-4  ">{budget.type}</th>

                    <td className="px-6 py-4">{budget.duration}</td>
                    <td className="px-6 py-4">{budget.budgetedHours}</td>
                    <td className="px-6 py-4 text-right flex gap-2">
                      {/* EDITBUDGET COMPONENT FOR POP UP  */}
                      {(myUser.role === "Admin" ||
                        myUser.role === "Auditor") && (
                        <>
                          <EditBudget budget={budget} setFetch={setFetch} />
                          <button
                            className="text-red-600"
                            onClick={() => handleDelete(budget._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Budget;

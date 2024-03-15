import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "monday-ui-react-core";
import Loader from "./Loader";
import EditTeam from "./EditTeam";

function Team({ project, setFetch, myUser }) {
  const [formData, setFormData] = useState({
    phaseNumber: "",
    numberOfResources: "",
    role: "",
    availabilityPercentage: "",
    duration: "",
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
      await axios.post(`/team/${project._id}`, formData).then((res) => {
        if (res.status === 200) {
          toast.success("Team Created successfully ");
          setFetch((prev) => !prev);
          setFormData({
            phaseNumber: "",
            numberOfResources: "",
            role: "",
            availabilityPercentage: "",
            duration: "",
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

  async function handleDelete(team_id) {
    // eslint-disable-next-line no-restricted-globals
    var a = confirm("Do you want to delete? ");
    if (a) {
      try {
        const response = await axios.delete(`/team/${project._id}/${team_id}`);
        toast.success(response.data.message);
        setFetch((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  }

  //LOGIC FOR CREATE OBJECT WHICH HAS PHASE NUMBER AS A KEY AND ARRAY OF PHASE AS A VALUE
  const groupByPhase = (phases) => {
    return phases.reduce((groupedPhases, phase) => {
      const key = phase.phaseNumber;
      if (!groupedPhases[key]) {
        groupedPhases[key] = [];
      }
      groupedPhases[key].push(phase);
      return groupedPhases;
    }, {});
  };

  return (
    <>
      {myUser && (
        <>
          {/* POP UP FOR ADD RISK  */}
          {(myUser?.role === "Admin" || myUser?.role === "PM") && (
            <Button onClick={openModal} className="m-2">
              + Add Team
            </Button>
          )}

          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handleSubmit}
                className="bg-bg_white text-bg_dark_font rounded-md shadow-lg shadow-bg_light_section border-2 border-bg_dark_section p-7 flex flex-col justify-center items-center gap-1"
              >
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="phaseNumber">
                    Phase
                  </label>
                  <input
                    required
                    type="number"
                    min={0}
                    id="phaseNumber"
                    name="phaseNumber"
                    value={formData.phaseNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md py-2 px-3"
                  />
                </div>
                <div className="mb-1 w-full">
                  <label className=" mb-1" htmlFor="numberOfResources">
                    Number of resources
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    id="numberOfResources"
                    name="numberOfResources"
                    value={formData.numberOfResources}
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
                  <label className=" mb-1" htmlFor="availabilityPercentage">
                    Availability %
                  </label>
                  <input
                    required
                    type="number"
                    min={0}
                    id="availabilityPercentage"
                    name="availabilityPercentage"
                    value={formData.availabilityPercentage}
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
                    id="duration"
                    name="duration"
                    value={formData.duration}
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
          {Object.entries(groupByPhase(project.project_team)).map(
            ([phaseNumber, phaseGroup]) => (
              <div key={phaseNumber} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Phase-{phaseNumber}</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No. Of Resources
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Availability Percentage
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {phaseGroup?.map((phase) => (
                      <tr
                        className="bg-white border-b  hover:bg-gray-50 "
                        key={phase._id}
                      >
                        <th className="px-6 py-4  ">
                          {phase.numberOfResources}
                        </th>
                        <th className="px-6 py-4  ">{phase.role}</th>
                        <th className="px-6 py-4  ">
                          {phase.availabilityPercentage}
                        </th>
                        <th className="px-6 py-4  ">{phase.duration}</th>

                        {(myUser?.role === "Admin" ||
                          myUser?.role === "PM") && (
                          <td className="px-6 py-4 text-right flex gap-2">
                            {/* EDITRESOURCE COMPONENT FOR POP UP  */}
                            <EditTeam team={phase} setFetch={setFetch} />
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
              </div>
            )
          )}
        </>
      )}
    </>
  );
}

export default Team;

import axios from "axios";
import React, { useEffect, useState } from "react";

function StackholderPage() {
  const [stackholders, setStackholders] = useState([]);
  useEffect(() => {
    async function fetchOneProject() {
      try {
        const response = await axios.get(`/stackholder/get-all-stackholder`);
        if (response.data) {
          setStackholders(response.data);
        }
      } catch (error) {
        console.error("Error fetching stackholder:", error);
      }
    }
    fetchOneProject();
  }, []);
  return (
    <>
      <div>
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
            {stackholders?.map((stackholder) => (
              <tr
                className="bg-white border-b  hover:bg-gray-50 "
                key={stackholder._id}
              >
                <th className="px-6 py-4  ">{stackholder.role}</th>
                <th className="px-6 py-4  ">{stackholder.name}</th>
                <th className="px-6 py-4  ">{stackholder.contact}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StackholderPage;

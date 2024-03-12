import React from "react";

function MyTab({ title, setTab, tab }) {
  return (
    <>
      <li className="me-2">
        <button
          className={`inline-block p-4 border-b-2 rounded-t-lg ${
            tab === title
              ? "text-blue-600 border-blue-600  "
              : "border-transparent hover:text-gray-600 hover:border-gray-300 "
          }`}
          onClick={() => setTab(title)}
        >
          {title}
        </button>
      </li>
    </>
  );
}

export default MyTab;

import React from "react";
import { Link } from "react-router-dom";

const ComponentManagementTable = ({ components, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-semibold text-gray-700">#</th>
            <th className="py-2 px-4 border-b font-semibold text-gray-700">Component Name</th>
            <th className="py-2 px-4 border-b font-semibold text-gray-700">Description</th>
            <th className="py-2 px-4 border-b font-semibold text-gray-700">Tags</th>
            <th className="py-2 px-4 border-b font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component, index) => (
            <tr key={index} className="hover:bg-gray-100 text-center">
              <td className="py-2 px-4 border-b text-gray-800">{index+1}</td>
              <td className="py-2 px-4 border-b text-gray-800">{component.componentName}</td>
              <td className="py-2 px-4 border-b text-gray-600">{component.componentDescription}</td>
              <td className="py-2 px-4 border-b text-gray-600">{component.tags}</td>
              <td className="py-2 px-4 border-b text-center">
               
                <button
                 
                  className="text-yellow-500 hover:text-yellow-600 mx-1"
                >
                  <Link to={`/dashboard/update-component/${component._id}`}>Update</Link>
                </button>
                <button
                  onClick={() => onDelete(component._id)}
                  className="text-red-500 hover:text-red-600 mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentManagementTable;

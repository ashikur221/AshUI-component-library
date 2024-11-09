import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const UpdateComponentForm = () => {
  const [componentData, setComponentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  // Fetch component data for the selected component
  const { data: component = {}, refetch } = useQuery({
    queryKey: ['component'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/component/${id}`);
      return res.data;
    }
  });

  // Set componentData once component is fetched
  useEffect(() => {
    if (component) {
      setComponentData(component);
    }
  }, [component]);


  // Handle updating component
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    axiosPublic.put(`/component/${id}`, componentData)
      .then(res => {
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Data Updated",
            showConfirmButton: false,
            timer: 1500
          });
        }

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });


  };

  // Update component fields
  const handleChange = (field, value) => {
    setComponentData((prev) => ({ ...prev, [field]: value }));
  };

  return componentData ? (
    <form onSubmit={handleUpdate} className="p-4 bg-white shadow-md rounded-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Edit Component</h2>

      <div>
        <label className="block font-semibold text-gray-700">Component Name:</label>
        <input
          type="text"
          value={componentData.componentName}
          onChange={(e) => handleChange("componentName", e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Description:</label>
        <textarea
          value={componentData.componentDescription}
          onChange={(e) => handleChange("componentDescription", e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded"
          rows="3"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Code:</label>
        <CodeMirror
          value={componentData.componentCode}
          height="200px"
          extensions={[javascript()]}
          theme="light"
          onChange={(value) => handleChange("componentCode", value)}
          className="border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Tags (optional):</label>
        <input
          type="text"
          value={componentData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white transition`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-75"></span>
            <span>Updating...</span>
          </div>
        ) : (
          "Update Component"
        )}
      </button>
    </form>
  ) : (
    <p>Loading component data...</p>
  );
};

export default UpdateComponentForm;

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddComponent = ({ onSubmit }) => {
  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [componentCode, setComponentCode] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = { componentName, componentDescription, componentCode, tags };

    try {
      const res = await axiosPublic.post('/component', data);
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your component has been added.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setComponentName("");
      setComponentDescription("");
      setComponentCode("");
      setTags("");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md space-y-4">
      <div>
        <label className="block font-semibold text-gray-700">Component Name:</label>
        <input
          type="text"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
          placeholder="Enter component name"
          className="mt-1 w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Description:</label>
        <textarea
          value={componentDescription}
          onChange={(e) => setComponentDescription(e.target.value)}
          placeholder="Enter component description"
          className="mt-1 w-full p-2 border border-gray-300 rounded"
          rows="3"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Code:</label>
        <CodeMirror
          value={componentCode}
          height="200px"
          extensions={[javascript()]}
          theme="light"
          onChange={(value) => setComponentCode(value)}
          className="border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700">Tags (optional):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add tags (e.g., button, form)"
          className="mt-1 w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="w-1/4 mx-auto">
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white transition`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-opacity-75"></span>
              <span>Uploading...</span>
            </div>
          ) : (
            "Add Component"
          )}
        </button>
      </div>
    </form>
  );
};

export default AddComponent;

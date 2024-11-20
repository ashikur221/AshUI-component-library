import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Swal from "sweetalert2";
import { uploadImg } from "../../../uploadFile/UploadImg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AddBackendComponent = ({ onSubmit }) => {
  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [componentCode, setComponentCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const image = form.image.files[0];

    let imageUrl = '';
    if (!image?.name) {
      imageUrl = ''
    } else {
      imageUrl = await uploadImg(image);
    }

    const data = { componentName, componentDescription, componentCode, imageUrl };

    try {
      const res = await axiosPublic.post('/backendComponent', data);
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your backend component has been added.",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsLoading(false);
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
    <>
      <Helmet>
        <title>Dashboard | Add Backend Component</title>
      </Helmet>
      <p className="text-3xl font-bold text-center my-4">Add Backend Component</p>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
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
          {/* image url  */}
          <div className="p-2 w-full">
            <div className="relative">
              <label className="leading-7 text-sm text-gray-600 font-bold">Component Image</label><br />
              <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Description:</label>
            <textarea
              value={componentDescription}
              onChange={(e) => setComponentDescription(e.target.value)}
              placeholder="Enter component description"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              rows="7"
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
    </>
  );
};

export default AddBackendComponent;

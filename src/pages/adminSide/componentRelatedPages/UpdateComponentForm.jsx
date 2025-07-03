import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { uploadImg } from "../../../uploadFile/UploadImg";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UpdateComponentForm = () => {
  const [componentCode, setComponentCode] = useState("");
  const [componentData, setComponentData] = useState({
    componentName: "",
    componentDescription: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();


  const { data: contents = [], refetch } = useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const res = await axiosPublic.get('/frontCategory');
      return res.data;
    }
  })

  const { id } = useParams();

  // Fetch the component data
  const { data: component = {}, isFetched } = useQuery({
    queryKey: ["component", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/component/${id}`);
      return res.data;
    },
    enabled: !!id, // Only fetch when `id` is available
  });

  // Set initial values when the component data is fetched
  useEffect(() => {
    if (isFetched && component?.componentName) {
      setComponentData({
        componentName: component.componentName || "",
        componentDescription: component.componentDescription || "",
        imageUrl: component.imageUrl || "",
      });
      setComponentCode(component.componentCode || ""); // Set initial code
    }
  }, [isFetched, component]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const componentName = form.componentName.value;
    const category = form.category.value;
    const image = form.image.files[0];
    const componentDescription = form.componentDescription.value;

    // If a new image is uploaded, upload it and get the URL
    let imageUrl = componentData.imageUrl;
    if (image?.name) {
      imageUrl = await uploadImg(image);
    }

    const data = {
      componentName,
      category,
      componentDescription,
      componentCode: componentCode || component?.componentCode, // Keep original code if unchanged
      imageUrl,
    };

    try {
      const res = await axiosPublic.put(`/component/${id}`, data);
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your component has been updated.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Update Frontend Component</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md space-y-4">

        <div className="w-11/12 p-6 mx-auto">
          <div className="grid lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700">Component Name:</label>
              <input
                type="text"
                value={componentData.componentName} // Controlled input
                name="componentName"
                placeholder="Enter component name"
                className="mt-1 w-full p-2 border border-gray-300 rounded"
                required
                onChange={(e) => setComponentData({ ...componentData, componentName: e.target.value })}
              />
            </div>

            {/* Image URL */}
            <div className=" w-full">
              <div className="relative">
                <label className=" text-sm text-gray-600 font-bold">Component Image</label>
                <br />
                <input
                  type="file"
                  name="image"
                  className="file-input file-input-bordered file-input-md w-full"
                />
              </div>
              <div className="avatar">
                <p>Already uploaded image:</p>
                <div className="w-12 rounded">
                  <img src={componentData.imageUrl} alt="Component Preview" />
                </div>
              </div>
            </div>

           

            <div className="">
              <label className="text-sm text-gray-600 font-bold">Component Category</label><br />
              <select name="category" className="select select-info w-full" required>
                <option value="" disabled selected>Select Category</option>
                {
                  contents?.map(content => <option key={content?.category} value={content?.category}>{content?.category}</option>)
                }
              </select>
            </div>


          </div>

          <div className="grid gap-4   lg:grid-cols-2">
            <div>
              <label className="block font-semibold text-gray-700">Description:</label>
              <textarea
                value={componentData.componentDescription} // Controlled input
                name="componentDescription"
                placeholder="Enter component description"
                className="mt-1 w-full p-2 border border-gray-300 rounded"
                rows="7"
                onChange={(e) => setComponentData({ ...componentData, componentDescription: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Code:</label>
              <CodeMirror
                value={componentCode} // Controlled by state
                height="200px"
                extensions={[javascript()]}
                theme="light"
                onChange={(value) => setComponentCode(value)} // Update code on change
                className="border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="w-1/4 mx-auto mt-4">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white transition`}
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
        </div>
      </form>
    </>
  );
};

export default UpdateComponentForm;

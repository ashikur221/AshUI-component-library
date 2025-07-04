import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { uploadImg } from "../../../uploadFile/UploadImg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UpdateCode = () => {
  const [componentCode, setComponentCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: contents = [], refetch } = useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const res = await axiosPublic.get('/codeCategory');
      return res.data;
    }
  })

  const { data: component = {}, isFetched } = useQuery({
    queryKey: ['component', id],  // Dependency on the 'id' parameter
    queryFn: async () => {
      const res = await axiosPublic.get(`/necessaryCode/${id}`);
      return res.data;
    },
    enabled: !!id, // Ensure the query runs only when 'id' is available
  });

  useEffect(() => {
    if (isFetched && component?.componentCode) {
      setComponentCode(component.componentCode);
    }
  }, [isFetched, component?.componentCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const componentName = form.componentName.value;
    const image = form.image.files[0];
    const componentDescription = form.componentDescription.value;

    let imageUrl = component?.imageUrl;
    if (!image?.name) {
      imageUrl = component?.imageUrl;
    } else {
      imageUrl = await uploadImg(image);
    }

    const data = {
      componentName,
      componentDescription,
      componentCode: componentCode || component?.componentCode,
      imageUrl,
    };
    console.log(data);

    try {
      const res = await axiosPublic.put(`/necessaryCode/${id}`, data);
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Code has been updated.",
          showConfirmButton: false,
          timer: 1500,
        });

        // Invalidate the query to refetch updated data
        queryClient.invalidateQueries(['component', id]); // Pass the 'id' to invalidate the specific query
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Dashboard | Update Necessary Code
        </title>
      </Helmet>
      <p className="text-3xl font-bold text-center my-4">Update Code</p>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md space-y-4">
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Functionality:</label>
            <input
              type="text"
              defaultValue={component?.componentName}
              name="componentName"
              placeholder="Enter component name"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* image url  */}
          <div className=" w-full">
            <div className="relative">
              <label className=" text-sm text-gray-600 font-bold">Graphical Representation</label><br />
              <input type="file" name="image" className="file-input file-input-bordered file-input-md w-full" />
            </div>
            <div className="avatar">
              <p>Already uploaded image:</p>
              <div className="w-12 rounded">
                <img src={component?.imageUrl} />
              </div>
            </div>
          </div>

          <div className="">
            <label className=" text-sm text-gray-600 font-bold">Code Category</label><br />
            <select name="category" className="select select-info w-full ">
              <option disabled selected>Select Category</option>
              {
                contents?.map(content => <option value={content?.category}>{content?.category}</option>)
              }
            </select>
          </div>


        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Description:</label>
            <textarea
              defaultValue={component?.componentDescription}
              name="componentDescription"
              placeholder="Enter component description"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
              rows="7"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Code:</label>
            <CodeMirror
              value={componentCode}  // Controlled by state to reflect updates
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
                <span>Updating...</span>
              </div>
            ) : (
              "Update Code"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateCode;

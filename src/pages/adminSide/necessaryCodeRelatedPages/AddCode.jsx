import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Swal from "sweetalert2";
import { uploadImg } from "../../../uploadFile/UploadImg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const AddCode = ({ onSubmit }) => {
  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");
  const [componentCode, setComponentCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();


  const { data: contents = [], refetch } = useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const res = await axiosPublic.get('/codeCategory');
      return res.data;
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const category = form.category.value;
    const image = form.image.files[0];

    let imageUrl = '';
    if (!image?.name) {
      imageUrl = ''
    } else {
      imageUrl = await uploadImg(image);
    }

    const data = { componentName, category, componentDescription, componentCode, imageUrl };

    try {
      const res = await axiosPublic.post('/necessaryCode', data);
      if (res) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Code has been added.",
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
        <title>
          Dashboard | Add Necessary Code
        </title>
      </Helmet>
      <p className="text-3xl font-bold text-center my-4">Add Necessary Code</p>

      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md space-y-4">
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">Functionality:</label>
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
          <div className=" w-full">
            <div className="relative">
              <label className=" text-sm text-gray-600 font-bold">Graphical Representation</label><br />
              <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full" />
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
              "Add Code"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCode;

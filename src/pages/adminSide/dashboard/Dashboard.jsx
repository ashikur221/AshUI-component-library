import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaCode } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BiSolidComponent } from "react-icons/bi";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allData = [] } = useQuery({
    queryKey: ["components"],
    queryFn: async () => {
      const res = await axiosPublic.get("/component");
      return res.data;
    },
  });

  const { data: backendComponents = [] } = useQuery({
    queryKey: ["backendComponents"],
    queryFn: async () => {
      const res = await axiosPublic.get("/backendComponent");
      return res.data;
    },
  });

  const { data: necessaryCodes = [] } = useQuery({
    queryKey: ["necessaryCodes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/necessaryCode");
      return res.data;
    },
  });

  return (
    <div className="  min-h-screen">
      <Helmet>
        <title>Dashboard | AshUi</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
        {/* Total Components Card */}
        <div className="bg-white shadow-lg rounded-lg p-6  flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Total Frontend Components</h2>
            <p className="text-3xl font-bold text-blue-500">{allData.length}</p>
          </div>
          <div className="text-blue-500 bg-blue-100 p-4 rounded-full">
            <BiSolidComponent className="text-xl" />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Total Admin Panel Components</h2>
            <p className="text-3xl font-bold text-blue-500">{backendComponents.length}</p>
          </div>
          <div className="text-blue-500 bg-blue-100 p-4 rounded-full">
            <MdOutlineAdminPanelSettings className="text-xl" />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Total Necessary Codes</h2>
            <p className="text-3xl font-bold text-blue-500">{necessaryCodes.length}</p>
          </div>
          <div className="text-blue-500 bg-blue-100 p-4 rounded-full">
            <FaCode className="text-xl" />
          </div>
        </div>



      </div>
    </div>
  );
};

export default Dashboard;

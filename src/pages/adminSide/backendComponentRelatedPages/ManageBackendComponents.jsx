import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import BackendComponentTable from "./BackendComponentTable";

const ManageBackendComponents = () => {

  const axiosPublic = useAxiosPublic();
  const { data: components = [], refetch } = useQuery({
    queryKey: ['allcomponent'],
    queryFn: async () => {
      const res = await axiosPublic.get('/backendComponent');
      return res.data;
    }
  })

  console.log(components);

  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosPublic.delete(`/backendComponent/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Component Deleted from database",
                icon: "success"
              });
              refetch();
            }
          })


      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Backend Components</h2>
      <BackendComponentTable
        components={components}
        
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageBackendComponents;

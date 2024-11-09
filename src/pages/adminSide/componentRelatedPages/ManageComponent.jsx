import React, { useState } from "react";
import ComponentManagementTable from "./ComponentManagementTable";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageComponent = () => {

  const axiosPublic = useAxiosPublic();
  const { data: components = [], refetch } = useQuery({
    queryKey: ['allcomponent'],
    queryFn: async () => {
      const res = await axiosPublic.get('/component');
      return res.data;
    }
  })

  console.log(components);

  const handleView = (component) => {
    alert(`Viewing component: ${component.componentName}`);
  };

  const handleEdit = (component) => {
    alert(`Editing component: ${component.componentName}`);
  };

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

        axiosPublic.delete(`/component/${id}`)
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
      <h2 className="text-xl font-semibold mb-4">Manage Components</h2>
      <ComponentManagementTable
        components={components}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageComponent;

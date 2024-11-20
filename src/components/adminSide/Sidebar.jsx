import React, { useContext, useState } from 'react';
import { BsMenuButtonWideFill } from 'react-icons/bs';
import { GrMoney } from 'react-icons/gr';
import { IoMdCard } from 'react-icons/io';
import { IoCartOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { MdLogout, MdMenuOpen, MdOutlineCategory, MdOutlineDiscount, MdOutlineLockPerson } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import { SiNginxproxymanager } from 'react-icons/si';
import { GrDashboard } from "react-icons/gr";

// update code 
import { FaHome, FaUsers, FaWpforms } from 'react-icons/fa';
import { FaCircleUser, FaFileWaveform } from 'react-icons/fa6';
import { MdAdd, MdAddCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaRegComments } from "react-icons/fa";
import Dropdown from './Dropdown';
import NavigationItem from './NavigationItem';
import { AuthContext } from '../../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import Swal from 'sweetalert2';

const Sidebar = () => {


  const { logOut } = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your  has been logout successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }


  const componentUrls =
    <>
      <NavigationItem to="/dashboard/add-component" icon={MdAddCircle} label="Add Components" />
      <NavigationItem to="/dashboard/manage-component" icon={SiNginxproxymanager} label="Manage Components" />
    </>

  const backendComponentUrls =
    <>
      <NavigationItem to="/dashboard/add-backendComponent" icon={MdAddCircle} label="Add Components" />
      <NavigationItem to="/dashboard/manage-backendComponent" icon={SiNginxproxymanager} label="Manage Components" />
    </>
  
  const necessaryCodeUrls =
    <>
      <NavigationItem to="/dashboard/add-code" icon={MdAddCircle} label="Add Code" />
      <NavigationItem to="/dashboard/manage-code" icon={SiNginxproxymanager} label="Manage Code" />
    </>
  

  return (
    <>
      <aside
        className={`bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-14'
          }`}
      >
        <div className="flex justify-between items-center p-4 gap-8">
          <div className={`text-2xl font-bold ${!isSidebarOpen && 'hidden'}`}>
            <Link to={'/'}>AshUi</Link>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {isSidebarOpen ? <IoCloseCircleOutline className='text-4xl' /> : <MdMenuOpen className='text-3xl' />}
          </button>
        </div>

        <nav className="flex-1 p-6">
          <ul className={`space-y-2 pb-20 list-none ${!isSidebarOpen && 'hidden'} `}>
            {/* <NavigationItem to="/dashboard" icon={FaHome} label="Dashboard" /> */}
            <NavigationItem
              to="/dashboard"
              icon={GrDashboard}
              label="Dashboard"
            />

            <li className="mb-4">
              <Dropdown buttonText="Frontend Components" urls={componentUrls} />
            </li>

            <li className="mb-4">
              <Dropdown buttonText="Admin Panel Components" urls={backendComponentUrls} />
            </li>

            <li className="mb-4">
              <Dropdown buttonText="Necessary Code" urls={necessaryCodeUrls} />
            </li>

            

            <li className="ml-4 mb-4">
              <button onClick={handleLogout} className=' px-5 py-2 rounded-lg flex gap-1 items-center hover:bg-gray-200 hover:border-transparent transition-all duration-300 active:scale-90'> Log Out <MdLogout /></button>
            </li>
          </ul>
        </nav>
      </aside></>
  );
};

export default Sidebar;
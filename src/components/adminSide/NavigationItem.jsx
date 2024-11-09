import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaWpforms, FaUsers } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import { FaCircleUser } from 'react-icons/fa6';
import { SiNginxproxymanager } from 'react-icons/si';

const NavigationItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-md hover:bg-gray-300 focus:bg-white focus:text-black active:bg-black active:text-white ${isActive ? 'bg-white text-black' : ''
          }`}
      >
        <Icon className="mr-2" />
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavigationItem;
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Fade as Hamburger } from 'hamburger-react';
import { motion } from 'framer-motion';
import { IoMdArrowDropdown } from 'react-icons/io';

const Navbar = () => {
    const [isOpen, setOpenMenu] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);
    const [isGetInTouchOpen, setGetInTouch] = useState(false);


    // Course data (logo and title)
    const courses = [
        {
            id: 1,
            title: 'ERP Solution',
            subtitle: 'ERP Solution dashboard...',
            url: '/courseDetails/3423', logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723465405/1_ggkx2f.webp'
        },


        {
            id: 2,
            title: 'Medical Solution',
            subtitle: 'Medical Solution attendance... ',
            url: '/courseDetails/3423',
            logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467392/3_mkjl0m.webp'
        },

        {
            id: 3,
            title: 'ERP Solution',
            subtitle: 'ERP Solution dashboard...',
            url: '/courseDetails/3425',
            logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467626/5_ah95wk.webp'
        },

        {
            id: 4,
            title: 'E-commerce Solution',
            subtitle: 'E-commerce Solution Inventory ...',
            url: '/courseDetails/3423',
            logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467020/2_tt0ldj.webp'
        },
        {
            id: 5,
            title: 'Data Analytics',
            subtitle: 'Revolutionize learning with Nimu...',
            url: '/courseDetails/3424',
            logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467809/6_whzw3l.webp'
        },
        {
            id: 3,
            title: 'IOT & Virtual Reality',
            subtitle: 'Streamline sales...',
            url: '/courseDetails/3425',
            logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467979/4_crl0kc.webp'
        },
    ];

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
        setDropdownOpen2(false);
        setGetInTouch(false);
    };

    const handleDropdownToggle2 = () => {
        setDropdownOpen2(!isDropdownOpen2);
        setGetInTouch(false);
        setDropdownOpen(false);
    };

    const handleDropdownToggle3 = () => {
        setGetInTouch(!isGetInTouchOpen);
        setDropdownOpen2(false);
        setDropdownOpen(false);
    };



    const handleHideDrawer = () => {
        setOpenMenu(false);
        document.getElementById('my-drawer').checked = false;
    };



    const logo = 'https://res.cloudinary.com/deifi77os/image/upload/v1726391234/AshUI/Homepage/ilg3csbhzu6arwfkq25l.png';

    const NavLinkStyle =
        'text-gray-600 hover:text-text_primari text-xl py-[5px] hover:px-[10px] lg:px-[10px] transition-all duration-300 font-medium';

    const navNavLinks = (
        <>

            <NavLink to="/components" onClick={handleHideDrawer} className={`${NavLinkStyle} `}>
                Components
            </NavLink>


            <NavLink to="/" onClick={handleHideDrawer} className={`${NavLinkStyle} `}>
                Templates
            </NavLink>
            
            <NavLink to="/" onClick={handleHideDrawer} className={`${NavLinkStyle} `}>
                Pricing
            </NavLink>

            {/* Products Dropdown Toggle */}
            <p
                onClick={handleDropdownToggle}
                className={`${NavLinkStyle} transition-all duration-300 flex justify-between items-center cursor-pointer`}
            >
                Products
                <span className={`transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <IoMdArrowDropdown />
                </span>
            </p>

            {/* Products Dropdown Menu */}
            <div
                className={`absolute border mx-auto top-12 left-20 rounded-md bg-white transition-all origin-top duration-300 ${isDropdownOpen ? 'block scale-y-100 p-2' : 'scale-y-0 h-0'
                    }`}
                style={{ width: '200px', minWidth: '400px', maxWidth: '400px' }} // Adjust width if needed
            >
                <div className="grid grid-cols-2 gap-4 ">
                    {courses.map((course) => (
                        <NavLink

                            key={course.id}
                            to={course.url}
                            onClick={handleHideDrawer}
                            className="flex items-center gap-2 p-2 text-gray-400 hover:text-blue-500 transition-all duration-300"
                        >
                            <img src={course.logo} alt={`${course.title} Logo`} className="w-9" />

                            <div className="text-xs">
                                <h2>{course.title}</h2>
                                <small title="" className="text-ellipsis text-[#9F73B1] block">{course.subtitle}</small>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Services Dropdown Toggle */}
            <p
                onClick={handleDropdownToggle2}
                className={`${NavLinkStyle} transition-all duration-300 flex justify-between items-center cursor-pointer`}
            >
                Services
                <span className={`transition-all duration-300 ${isDropdownOpen2 ? 'rotate-180' : 'rotate-0'}`}>
                    <IoMdArrowDropdown />
                </span>
            </p>

            {/* Services Dropdown Menu */}
            <div
                className={`absolute border mx-auto top-10 left-56 rounded-md bg-white transition-all origin-top duration-300 ${isDropdownOpen2 ? 'block scale-y-100 p-2' : 'scale-y-0 h-0'
                    }`}
                style={{ width: '200px', minWidth: '400px', maxWidth: '400px' }} // Adjust width if needed
            >
                <div className="grid grid-cols-2 gap-4 ">
                    {courses.map((course) => (
                        <NavLink
                            key={course.id}
                            to={course.url}
                            onClick={handleHideDrawer}
                            className="flex items-center gap-2 p-2 text-gray-400 hover:text-blue-500 transition-all duration-300"
                        >
                            <img src={course.logo} alt={`${course.title} Logo`} className="w-10" />

                            <div className="text-xs">
                                <h2>{course.title}</h2>
                                <small title="" className="text-ellipsis text-[#9F73B1] block">{course.subtitle}</small>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>

            <NavLink to="/aboutUs" onClick={handleHideDrawer} className={`${NavLinkStyle} `}>
                Portfolio
            </NavLink>

            {/* Get in Touch Dropdown Toggle */}
            <p
                onClick={handleDropdownToggle3}
                className={`${NavLinkStyle} transition-all duration-300 flex justify-between items-center cursor-pointer`}
            >
                Get in Touch
                <span className={`transition-all duration-300 ${isGetInTouchOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <IoMdArrowDropdown />
                </span>
            </p>

            {/* Get in Touch Dropdown Menu */}
            <div
                className={`absolute border mx-auto top-10 left-[470px] rounded-md bg-white transition-all origin-top duration-300 ${isGetInTouchOpen ? 'block scale-y-100 p-2' : 'scale-y-0 h-0'
                    }`}
                style={{ width: '80px', minWidth: '150px', maxWidth: '150px' }} // Adjust width if needed
            >
                <div className='flex flex-col items-center justify-center text-center'>
                    <NavLink to="/about-us" className={`${NavLinkStyle} `}>
                        About Us
                    </NavLink>

                    <NavLink to="/aboutUs" className={`${NavLinkStyle} `}>
                        Contact Us
                    </NavLink>

                    <NavLink to="/aboutUs" className={`${NavLinkStyle} `}>
                        Career
                    </NavLink>


                    <NavLink to="/aboutUs" className={`${NavLinkStyle} `}>
                        Company Profile
                    </NavLink>

                    <NavLink to="/aboutUs" className={`${NavLinkStyle} `}>
                        Our Team
                    </NavLink>

                </div>

            </div>

        </>
    );

    const navNavLinksForDrawer = (
        <>
            <NavLink to="/" onClick={handleHideDrawer} className={`${NavLinkStyle}`}>
                <p className='text-white'>Home</p>
            </NavLink>
            <NavLink to="/about-us" onClick={handleHideDrawer} className={`${NavLinkStyle}`}>
                <p className='text-white'>About Us</p>
            </NavLink>

            {/* Mobile Drawer Dropdown */}
            {/* Products  */}
            <p
                onClick={handleDropdownToggle}
                className={`text-xl hover:text-white rounded-md py-[5px] transition-all duration-300 flex justify-between items-center cursor-pointer`}
            >
                Products
                <span className={`transition-all duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <IoMdArrowDropdown />
                </span>
            </p>

            <div
                className={`rounded-md bg-black/10 flex flex-col ml-4 transition-all origin-top duration-300 ${isDropdownOpen ? 'block scale-y-100 p-2' : 'scale-y-0 h-0'
                    } gap-2`}
            >
                {courses.map((course) => (
                    <NavLink
                        key={course.id}
                        to={course.url}
                        onClick={handleHideDrawer}
                        className="flex items-center gap-2 p-2 hover:text-blue-500 transition-all duration-300"
                    >
                        <img src={course.logo} alt={`${course.title} Logo`} className="w-8 h-8 bg-white rounded-lg" />
                        <span className="text-white">{course.title}</span>
                    </NavLink>
                ))}
            </div>


            {/* Mobile Drawer Dropdown */}
            {/* Services  */}
            <p
                onClick={handleDropdownToggle2}
                className={`text-xl hover:text-white rounded-md py-[5px] transition-all duration-300 flex justify-between items-center cursor-pointer`}
            >
                Services
                <span className={`transition-all duration-300 ${isDropdownOpen2 ? 'rotate-180' : 'rotate-0'}`}>
                    <IoMdArrowDropdown />
                </span>
            </p>

            <div
                className={`rounded-md bg-black/10 flex flex-col ml-4 transition-all origin-top duration-300 ${isDropdownOpen2 ? 'block scale-y-100 p-2' : 'scale-y-0 h-0'
                    } gap-2`}
            >
                {courses.map((course) => (
                    <NavLink
                        key={course.id}
                        to={course.url}
                        onClick={handleHideDrawer}
                        className="flex items-center gap-2 p-2 hover:text-blue-500 transition-all duration-300"
                    >
                        <img src={course.logo} alt={`${course.title} Logo`} className="w-8 h-8 bg-white rounded-lg" />
                        <span className="text-white">{course.title}</span>
                    </NavLink>
                ))}
            </div>


            {/* Mobile Drawer Dropdown */}
            {/* Get in touch  */}
            <p
                onClick={handleDropdownToggle3}
                className={`text-xl hover:text-white rounded-md py-[5px] transition-all duration-300 flex justify-between items-center cursor-pointer`}
            >
                Get In Touch
                <span className={`transition-all duration-300 ${isGetInTouchOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <IoMdArrowDropdown />
                </span>
            </p>

            <div
                className={`rounded-md bg-black/10 flex flex-col ml-4 transition-all origin-top duration-300 ${isGetInTouchOpen ? 'block scale-y-100 p-2' : 'scale-y-0 h-0'
                    } gap-2`}
            >
                <div className='flex flex-col text-white items-center justify-center text-center'>
                    <NavLink to="/about-us" className={`${NavLinkStyle} text-white`}>
                        About Us
                    </NavLink>

                    <NavLink to="/aboutUs" className={`${NavLinkStyle} text-white`}>
                        Contact Us
                    </NavLink>

                    <NavLink to="/aboutUs" className={`${NavLinkStyle} text-white`}>
                        Career
                    </NavLink>


                    <NavLink to="/aboutUs" className={`${NavLinkStyle} text-white`}>
                        Company Profile
                    </NavLink>

                    <NavLink to="/aboutUs" className={`${NavLinkStyle} text-white`}>
                        Our Team
                    </NavLink>

                </div>
            </div>








            <NavLink to="/onlineAdmission" onClick={handleHideDrawer} className={`${NavLinkStyle}`}>
                <p className="text-white">Portfolio</p>
            </NavLink>

        </>
    );

    return (
        <div className="sticky top-0 z-20 shadow-lg">
            <div className="navbar bg-gray-50 text-white py-1">
                <div className="w-full">
                    {/* Mobile view */}
                    <div className="text-white w-full flex justify-between items-center lg:hidden">
                        <img src={logo} alt="Logo" className="w-10" />
                        <div className="block lg:hidden drawer w-max z-50">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content cursor-pointer">
                                <label htmlFor="my-drawer" className="z-50 cursor-pointer text-black">
                                    <Hamburger toggled={isOpen} toggle={setOpenMenu} size={23} duration={0.6} />
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label
                                    onClick={() => setOpenMenu(false)}
                                    htmlFor="my-drawer"
                                    className="drawer-overlay"
                                ></label>
                                <motion.ul className="menu p-4 w-56 md:w-80 min-h-full bg-ashUi_secondary text-white space-y-2 rounded-lg z-40 navbarUl">
                                    {navNavLinksForDrawer}
                                </motion.ul>
                            </div>
                        </div>
                    </div>
                    {/* Laptop view */}
                    <div className="text-sm hidden lg:flex container mx-auto ">
                        <div className='flex justify-center gap-24'>
                            <Link to="/">
                                <div className="flex justify-center items-center gap-2">
                                    <img src={logo} alt="Logo" className="w-10" />
                                    <p className='text-ashUi_secondary text-2xl font-bold'>AshUi</p>
                                </div>
                            </Link>
                            <nav className="relative md:ml-auto flex flex-wrap items-center justify-center font-bold navbarUl gap-x-4 gap-y-1">
                                {navNavLinks}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

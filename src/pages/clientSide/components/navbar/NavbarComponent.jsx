import React, { useEffect } from 'react';
import Navbar from '../../../../components/Navbar';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Prism.js CSS for code styling

const NavbarComponent = () => {
    // The code string to display and copy
    const navbarCode = `
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

    const courses = [
        { id: 1, title: 'ERP Solution', subtitle: 'ERP Solution dashboard...', url: '/courseDetails/3423', logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723465405/1_ggkx2f.webp' },
        { id: 2, title: 'Medical Solution', subtitle: 'Medical Solution attendance...', url: '/courseDetails/3423', logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467392/3_mkjl0m.webp' },
        { id: 3, title: 'ERP Solution', subtitle: 'ERP Solution dashboard...', url: '/courseDetails/3425', logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467626/5_ah95wk.webp' },
        { id: 4, title: 'E-commerce Solution', subtitle: 'E-commerce Solution Inventory...', url: '/courseDetails/3423', logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467020/2_tt0ldj.webp' },
        { id: 5, title: 'Data Analytics', subtitle: 'Revolutionize learning with Nimu...', url: '/courseDetails/3424', logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467809/6_whzw3l.webp' },
        { id: 6, title: 'IOT & Virtual Reality', subtitle: 'Streamline sales...', url: '/courseDetails/3425', logo: 'https://res.cloudinary.com/dqescabbl/image/upload/v1723467979/4_crl0kc.webp' }
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

    const NavLinkStyle = 'text-gray-600 hover:text-text_primari text-xl py-[5px] hover:px-[10px] lg:px-[10px] transition-all duration-300 font-medium';

    const navNavLinks = (
        <>
            <NavLink to="/components" onClick={handleHideDrawer} className={\`\${NavLinkStyle}\`}>
                Components
            </NavLink>
            <NavLink to="/" onClick={handleHideDrawer} className={\`\${NavLinkStyle}\`}>
                Templates
            </NavLink>
            <NavLink to="/" onClick={handleHideDrawer} className={\`\${NavLinkStyle}\`}>
                Pricing
            </NavLink>
            <p onClick={handleDropdownToggle} className={\`\${NavLinkStyle} flex justify-between items-center cursor-pointer\`}>
                Products
                <span className={\`transition-all \${isDropdownOpen ? 'rotate-180' : 'rotate-0'}\`}>
                    <IoMdArrowDropdown />
                </span>
            </p>
            <div className={\`absolute top-12 left-20 bg-white transition-all \${isDropdownOpen ? 'block' : 'hidden'}\`}>
                {courses.map((course) => (
                    <NavLink key={course.id} to={course.url} onClick={handleHideDrawer} className="p-2 hover:text-blue-500">
                        <img src={course.logo} alt={course.title} className="w-9" />
                        <div className="text-xs">
                            <h2>{course.title}</h2>
                            <small>{course.subtitle}</small>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );

    return (
        <div className="sticky top-0 z-20 shadow-lg">
            <div className="navbar bg-gray-50 text-white py-1">
                <div className="w-full">
                    <div className="lg:hidden">
                        <Hamburger toggled={isOpen} toggle={setOpenMenu} />
                        <div className={\`drawer \${isOpen ? 'block' : 'hidden'}\`}>
                            {navNavLinks}
                        </div>
                    </div>
                    <div className="hidden lg:flex container mx-auto">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="w-10" />
                        </Link>
                        <nav className="ml-auto flex">{navNavLinks}</nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
`;


    // Highlight the code when the component mounts
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    // Function to copy code to the clipboard
    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(navbarCode).then(() => {
            alert('Code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="min-h-screen">
            <div>
                <div className="container mx-auto">
                    {/* Output section */}
                    <p className="text-4xl my-5 text-ashUi_primary font-bold">
                        Responsive Navbar
                    </p>
                    <Navbar />


                    {/* Code display section */}
                    <section className="code my-10">
                        {/* Copy Code Button */}
                        <div className="flex justify-end ">
                            <button
                                onClick={copyCodeToClipboard}
                                className="bg-ashUi_primary text-white px-4 py-2 rounded-md"
                            >
                                Copy Code
                            </button>
                        </div>
                        <pre>
                            <code className="language-js">
                                {navbarCode}
                            </code>
                        </pre>
                    </section>


                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;

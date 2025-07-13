import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

import { IoIosArrowUp, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdOutlinePrivacyTip} from "react-icons/md";

import { FaQuestion } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";


const Sidebar = () => {
    const location = useLocation();
    const [expanded, setExpanded] = useState(null);

    const sidebarItems = [
        { name: "Dashboard", icon: <MdOutlineDashboard  />, link: "/dashboard" },
        { name: "Users Lists", icon: <PiUsersThree />, link: "/userslists" },
        { name: "Push Notification", icon: <IoMdNotificationsOutline />, link: "/push-notification" },
        { name: "All Exams", icon: <CgNotes />, link: "/allexams" },
        { name: "All Sub Exams", icon: <CgNotes />, link: "/allsubexams" },
        { name: "All Test Series", icon: <CgNotes />, link: "/alltestseries" },
        { name: "All Mock Testst", icon: <CgNotes />, link: "/allmocktests" },
        { name: "All Tests", icon: <CgNotes />, link: "/alltests" },
        { name: "All Banners", icon: <CgNotes />, link: "/all-banners" },
        { name: "All Questions", icon: <CgNotes />, link: "/all-questions" },
        { name: "All Resources", icon: <CgNotes />, link: "/all-resources" },
        {
            name: "Policy Setting",
            icon: <MdOutlinePrivacyTip />,
            subItems: [
                { name: "Privacy Policy", icon: <IoIosArrowForward />, link: "/privacy-policy" },
                { name: "Terms & Condition", icon: <IoIosArrowForward />, link: "/terms-and-conditions" },
                { name: "About Us", icon: <IoIosArrowForward />, link: "/about-us" }
            ],
        },
        { name: "FAQs", icon: <FaQuestion />, link: "/support-faqs" },
    ];

    const toggleExpand = (itemName) => {
        setExpanded((prev) => (prev === itemName ? null : itemName));
    };

    const isActivePath = (item) => {
        if (location.pathname.includes(item.link)) return true;
        if (item.subItems) {
            return item.subItems.some((subItem) => location.pathname.includes(subItem.link));
        }
        return false;
    };

    return (
        <div className="sidebarcontainer">
            <div className="sidelogo">
                <div className="sidelogo1">
                    <h1>Ed</h1>
                    <h1>Tech</h1>
                </div>
            </div>
            <div className="sideitems">
                {sidebarItems.map((item) => (
                    <div key={item.name}>
                        <NavLink
                            to={item.link}
                            className={isActivePath(item) ? "sideitemactive" : "sideitem"}
                            onClick={() => item.subItems && toggleExpand(item.name)}
                        >
                            {item.icon}
                            <p>{item.name}</p>
                            {item.subItems && (
                                <span>{expanded === item.name ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                            )}
                        </NavLink>
                        {item.subItems && expanded === item.name && (
                            <div className="subitems">
                                {item.subItems.map((sub) => (
                                    <NavLink
                                        key={sub.name}
                                        to={sub.link}
                                        className={location.pathname.includes(sub.link) ? "sidesubitemactive" : "sidesubitem"}
                                    >
                                        {sub.icon}
                                        <p>{sub.name}</p>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

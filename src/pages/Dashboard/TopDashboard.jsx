import React from 'react'

import { LuUsers } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { CgNotes } from "react-icons/cg";
import { IoFolderOutline } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";

const TopDashboard = ({ Data }) => {

    const dashboardData = [
        {
            label: "Total Users",
            value: Data?.Users,
            icon: <LuUsers color="#000000" size={25} />,
            link: '/userslists'
        },
        {
            label: "Total Exams",
            value: Data?.Exams,
            icon: <CgNotes color="#000000" size={25} />,
            link: '/allexams'
        },
        {
            label: "Total SubExams",
            value: Data?.SubExams,
            icon: <CgNotes color="#000000" size={25} />,
            link: '/allsubexams'
        },
        {
            label: "Total TestSeries",
            value: Data?.TestSeries,
            icon: <CgNotes color="#000000" size={25} />,
            link: '/alltestseries'
        },
        {
            label: "Total MockTests",
            value: Data?.MockTests,
            icon: <CgNotes color="#000000" size={25} />,
            link: '/allmocktests'
        },
        {
            label: "Total Tests",
            value: Data?.Tests,
            icon: <CgNotes color="#000000" size={25} />,
            link: '/alltests'
        },
        {
            label: "Total Resources",
            value: Data?.Resources,
            icon: <IoFolderOutline color="#000000" size={25} />,
            link: '/transaction-lists/admin-transaction'
        },{
            label: "Total Banners",
            value: Data?.Banners,
            icon: <IoImagesOutline  color="#000000" size={25} />,
            link: '/transaction-lists/admin-transaction'
        },{
            label: "Total Questions",
            value: Data?.Questions,
            icon: <FaRegQuestionCircle color="#000000" size={25} />,
            link: '/transaction-lists/admin-transaction'
        },
    ];

    return (
        <div className="topdashboardcontainer">
            {dashboardData.map((item, index) => (
                <Link to={item.link || '#'} key={index} className='link'>
                    <div className="topdashboard1">
                        <div className="topdashboard2">{item.icon}</div>
                        <div className="topdashboard3">
                            <p>{item.label}</p>
                            <h6>{item.value}</h6>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TopDashboard;

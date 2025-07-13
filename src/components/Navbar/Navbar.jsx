import React from 'react'
import './Navbar.css'

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import { useAdmin } from '../../pages/Admin Profile/AdminContext';
import { IoMdLogOut } from "react-icons/io";


import img from '../../assest/user.webp'

const Navbar = ({ toggleSidebar, text }) => {
    const navigate = useNavigate()
    const { adminProfile, loading } = useAdmin();
    const logout = () => {
        sessionStorage.removeItem('token')
        navigate("/");
        toast.success("Logged out successfully!");
    };

    return (
        <>
            <div className='navbarcontainer'>
                <div className='navbarleft'>
                    <h2>Admin Panel</h2>
                    <span>Welcome, Admin!</span>
                </div>
                <div className='navbarright'>
                    <div className='navbarleftsearchicon' onClick={logout}>
                        <IoMdLogOut color='#FEFEFE' size={20} />
                        <p>Logout</p>
                    </div>
                    <div className='navbarlines'>

                    </div>
                    {loading ? (
                        <div className='normalloading'>
                            <p>Loading....</p>
                        </div>
                    ) : (
                        <div className='navbarprofile' onClick={() => navigate('/admin-profile')}>
                            <div className='navprofile'>
                                <img src={adminProfile?.admin?.image || img} alt="" />
                            </div>
                            <div className='navbarprofilename'>
                                <h6>{adminProfile?.admin?.fullName || "Admin"}</h6>
                                <span>{adminProfile?.admin?.email || "N/A"}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar
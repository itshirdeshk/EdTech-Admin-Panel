import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiLineVerticalBold } from "react-icons/pi";

import img from '../../assest/loading1.gif'



const ContactSupport = () => {
    const navigate = useNavigate()

    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallContact, {
            setResponse: setContactData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch faq data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Help & Support</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='addserivce-btn'>
                            <button onClick={() => navigate('/help-Support/contact-support/add-contact-support')}>Create new</button>
                        </div>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/help-Support/support-faq'} className='link'>
                        <div className='servicetnasction'>
                            <h6>FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/maincategory-faq'} className='link'>
                        <div className='servicetnasction'>
                            <h6>MainCategory FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/ticket-raised'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Ticket Raised</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/contact-support'} className='link'>
                        <div className='servicetnasctionactive' >
                            <h6>Contact Support</h6>
                        </div>
                    </Link>

                </div>
                <div className='userlist6'>
                    <div className='contactsupportcontainer'>
                        {loading ? (
                            <div className='normalloading'>
                                <img src={img} alt="" />
                            </div>
                        ) : !contactData?.data ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            <div className='contactsupport-div'>
                                {/* <div className='contactsupport-div-icons'>
                                    <MdOutlineModeEdit
                                        color='#FF5534'
                                        size={20}
                                        onClick={() => navigate('/help-Support/contact-support/edit-contact-support')}
                                    />
                                    <PiLineVerticalBold color='#0000001A' size={20} />
                                    <RiDeleteBin6Line color='#FF5534' size={20} />
                                </div> */}
                                <div className='contactsupport-div-div'>
                                    {/* <div className='contactsupport-div-div-profile'>
                                        <div className='contactsupport-profile'>
                                            <img src={img} alt="" />
                                        </div>
                                        <h6>{contactData.data.name}</h6>
                                    </div> */}
                                    <div className='contactsupport-div-div-content'>
                                        <p>
                                            <span>Phone No.:</span>
                                            {contactData.data.mobileNumber}
                                        </p>
                                        <p>
                                            <span>Mobile Number Description:</span>
                                            {contactData.data.mobileNumberDescription}
                                        </p>
                                        <p>
                                            <span>Email:</span>
                                            {contactData.data.email}
                                        </p>
                                        <p>
                                            <span>Email Description:</span>
                                            {contactData.data.emailDescription}
                                        </p>
                                        <p>
                                            <span>WhatApp chat:</span>
                                            {contactData.data.whatAppchat}
                                        </p>
                                        <p>
                                            <span>whatAppchat Description:</span>
                                            {contactData.data.whatAppchatDescription}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div >
        </>
    )
}

export default HOC(ContactSupport)
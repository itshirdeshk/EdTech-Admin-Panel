import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';


const Editcontactsupport = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit contact support</h6>
                    </div>
                    <div className='addserivce-btn'>
                        <button onClick={() => navigate('/help-Support/contact-support')}>Add new </button>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='contactsupport-details-inputes'>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Name</label>
                                <input type="text" />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Phone Number</label>
                                <input type="text" />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Email</label>
                                <input type="text" />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Address</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className='contactsupport-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate('/help-Support/contact-support')}>Cancel</button>
                            </div>
                            <div className='addserivce-btn'>
                                <button onClick={() => navigate('/help-Support/contact-support')}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Editcontactsupport)
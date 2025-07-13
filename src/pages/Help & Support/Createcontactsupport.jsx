import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { toast } from 'react-toastify';


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';


const Createcontactsupport = () => {
    const navigate = useNavigate()
    const [mobilenumber, SetMobileNumber] = useState('');
    const [mobilenumberdescription, SetMobileNumberDescription] = useState('');
    const [email, SetEmail] = useState('');
    const [emaildescription, SetEmailDescription] = useState('');
    const [whatAppchat, SetWhatAppchat] = useState('');
    const [whatAppchatdescription, SetWhatAppchatDescription] = useState('');
    const [loading, setLoading] = useState('');



    const handleSubmit = async () => {
        if (
            !mobilenumber || 
            !mobilenumberdescription || 
            !email || 
            !emaildescription || 
            !whatAppchat || 
            !whatAppchatdescription
        ) {
            toast.error("All fields are required!");
            return;
        }
    
        const payload = {
            "mobileNumber": mobilenumber,
            "mobileNumberDescription": mobilenumberdescription,
            "email": email,
            "emailDescription": emaildescription,
            "whatAppchat": whatAppchat,
            "whatAppchatDescription": whatAppchatdescription,
        };
    
        await postApi(endPoints.addcontactdetails, payload, {
            setLoading,
            successMsg: 'New Contact Details added successfully!',
            errorMsg: 'Failed to add contact details!',
        });
    
        navigate("/help-Support/contact-support");
    };
    

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Create contact support</h6>
                    </div>
                    <div className='addserivce-btn'>
                        <button onClick={() => navigate('/help-Support/contact-support')}>Add new </button>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='contactsupport-details-inputes'>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Mobile Number</label>
                                <input type="number"
                                    placeholder='Enter the mobile number'
                                    value={mobilenumber}
                                    onChange={(e) => SetMobileNumber(e.target.value)}
                                />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Phone Number Description</label>
                                <input type="text"
                                    placeholder='Enter the mobile number description'
                                    value={mobilenumberdescription}
                                    onChange={(e) => SetMobileNumberDescription(e.target.value)}
                                />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Email</label>
                                <input type="email"
                                    placeholder='Enter the email'
                                    value={email}
                                    onChange={(e) => SetEmail(e.target.value)}
                                />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">Email Description</label>
                                <input type="text"
                                    placeholder='Enter the email'
                                    value={emaildescription}
                                    onChange={(e) => SetEmailDescription(e.target.value)}
                                />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">WhatAppchat Number</label>
                                <input type="number"
                                    placeholder='Enter the whatAppchat number'
                                    value={whatAppchat}
                                    onChange={(e) => SetWhatAppchat(e.target.value)}
                                />
                            </div>
                            <div className='ticketraised-details-inputes'>
                                <label htmlFor="">WhatAppchat Number Description</label>
                                <input type="text"
                                    placeholder='Enter the whatAppchat number description'
                                    value={whatAppchatdescription}
                                    onChange={(e) => SetWhatAppchatDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='contactsupport-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate('/help-Support/contact-support')}>Cancel</button>
                            </div>
                            <div className='addserivce-btn'>
                                <button onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Createcontactsupport)
import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';


const Createnewpolicy = () => {
    const navigate = useNavigate()
    const [privacy, SetPrivacy] = useState('');
    const [privacytitle, SetPrivacyTitle] = useState('');
    const [loading, setLoading] = useState('');


    const handleUpdate = async () => {
        const payload = {
            "title": privacytitle,
            "content": privacy
        }

        await postApi(endPoints.addPrivacyPolicy, payload, {
            setLoading,
            successMsg: 'Privacy Policy added successfully!',
            errorMsg: 'Failed to add privacy policy!',
        });
        navigate("/privacy-policy");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Create new policy</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='Enter Title'  value={privacytitle} onChange={(e) => SetPrivacyTitle(e.target.value)} />
                        </div>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Description</label>
                            <textarea name="" id="" placeholder='Write description here.'
                                value={privacy}
                                onChange={(e) => SetPrivacy(e.target.value)}>
                            </textarea>
                        </div>

                        <div className='addprivacy-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate('/privacy-policy')}>Cancel</button>
                            </div>
                            <div className='addserivce-btn'>
                                <button onClick={handleUpdate} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Createnewpolicy)
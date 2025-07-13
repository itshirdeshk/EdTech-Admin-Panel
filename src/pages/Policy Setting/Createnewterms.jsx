import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';

const Createnewterms = () => {
    const navigate = useNavigate()
    const [termstitle, SetTermsTitle] = useState('');
    const [termsContent, SetTermsContent] = useState('');
    const [loading, setLoading] = useState('');


    const handleUpdate = async () => {
        const payload = {
            "title": termstitle,
            "content": termsContent
        }

        await postApi(endPoints.addterms, payload, {
            setLoading,
            successMsg: 'Terms & Conditions added successfully!',
            errorMsg: 'Failed to add terms & conditions!',
        });
        navigate("/terms-and-conditions");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Create new terms</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='Enter Title'
                                value={termstitle}
                                onChange={(e) => SetTermsTitle(e.target.value)}
                            />
                        </div>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Description</label>
                            <textarea
                                name="" id=""
                                placeholder='Write description here.'
                                value={termsContent}
                                onChange={(e) => SetTermsContent(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='addprivacy-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate('/terms-and-conditions')}>Cancel</button>
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

export default HOC(Createnewterms)
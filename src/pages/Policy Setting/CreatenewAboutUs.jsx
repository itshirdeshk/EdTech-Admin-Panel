import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';


const CreatenewAboutUs = () => {
    const navigate = useNavigate()
    const [title, SetTitle] = useState('');
    const [content, SetContent] = useState('');
    const [loading, setLoading] = useState('');


    const handleUpdate = async () => {
        const payload = {
            "title": title,
            "content": content
        }

        await postApi(endPoints.addAboutUs, payload, {
            setLoading,
            successMsg: 'About Us added successfully!',
            errorMsg: 'Failed to add about us!',
        });
        navigate("/about-us");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Create new AboutUs</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Title</label>
                            <input type="text" placeholder='Enter Title'  value={title} onChange={(e) => SetTitle(e.target.value)} />
                        </div>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Description</label>
                            <textarea name="" id="" placeholder='Write description here.'
                                value={content}
                                onChange={(e) => SetContent(e.target.value)}>
                            </textarea>
                        </div>

                        <div className='addprivacy-btn'>
                            <div className='partnerprofile-btn'>
                                <button onClick={() => navigate('/about-us')}>Cancel</button>
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

export default HOC(CreatenewAboutUs)
import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, putApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

const EditAboutUs = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [title, SetTitle] = useState('');
    const [content, SetContent] = useState('');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState('');

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getaboutUsbyid(id), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch About Us",
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data?.aboutUs) {
            SetTitle(data?.aboutUs?.title);
            SetContent(data?.aboutUs?.content);
        }
    }, [data]);

    const handleUpdate = async () => {
        const payload = {
            "title": title,
            "content": content
        }

        await putApi(endPoints.updateAboutUs(id), payload, {
            setLoading,
            successMsg: 'About Us updated successfully!',
            errorMsg: 'Failed to update about us!',
        });
        navigate("/about-us");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit About Us</h6>
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

export default HOC(EditAboutUs)
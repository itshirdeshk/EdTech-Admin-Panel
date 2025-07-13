import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'

import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, putApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

const Editprivacypolicy = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [privacytitle, SetPrivacyTitle] = useState('');
    const [privacy, SetPrivacy] = useState('');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState('');

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getprivactpolicybyid(id), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch privacy policy!",
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data?.privacyPolicy) {
            SetPrivacyTitle(data?.privacyPolicy?.title);
            SetPrivacy(data?.privacyPolicy?.content);
        }
    }, [data]);

    const handleUpdate = async () => {
        const payload = {
            "title": privacytitle,
            "content": privacy
        }

        await putApi(endPoints.updatePrivacyPolicy(id), payload, {
            setLoading,
            successMsg: 'Privacy Policy updated successfully!',
            errorMsg: 'Failed to update privacy policy!',
        });
        navigate("/privacy-policy");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit privacy policy</h6>
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

export default HOC(Editprivacypolicy)
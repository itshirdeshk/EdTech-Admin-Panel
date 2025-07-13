import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi, putApi } from '../../Repository/Api';

import img from '../../assest/loading1.gif'

const EditMainCategoryFAQ = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState({});
    const [question, SetQuestion] = useState('');
    const [answer, SetAnswer] = useState('');
    const [loading, setLoading] = useState('');
    const [maincategoryId, setmainCategoryId] = useState('');

    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);



    const fetchData = useCallback(async () => {
        await getApi(endPoints.getfaqbyid(id), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch faq!",
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data?.data) {
            SetQuestion(data?.data?.question);
            SetAnswer(data?.data?.answer);
        }
    }, [data]);



    const handleUpdate = async () => {
        const payload = {
            "question": question,
            "answer": answer,
            "mainCategoryId": maincategoryId,
            "type": "MainCategory"
        }

        await putApi(endPoints.updateFAQ(id), payload, {
            setLoading,
            successMsg: 'Maincategory FAQ updated successfully!',
            errorMsg: 'Failed to update faq!',
        });
        navigate("/help-Support/maincategory-faq");
    };

    const fetchMainCategories = async () => {
        await getApi(endPoints.getallMaincategory, {
            setResponse: setMainCategoryOptions,
            setLoading,
            // errorMsg: "Failed to fetch main categories!",
        });
    };

    useEffect(() => {
        fetchMainCategories();
    }, []);


    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit Maincategory FAQ</h6>
                    </div>
                </div>
                {loading ?
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                    :
                    <div className='addprivacy-container'>
                        <div className='addprivacy-main'>
                            <div className="addprivacy-inputes">
                                <label htmlFor="">MainCategory</label>
                                <select
                                    name="mainCategory"
                                    value={maincategoryId}
                                    onChange={(e) => setmainCategoryId(e.target.value)}
                                >
                                    <option value="">Select Main Category</option>
                                    {loading ?
                                        <option value="">Loading...</option>
                                        :
                                        mainCategoryOptions?.data?.length === 0 ?
                                            <option value="">No data</option>
                                            :
                                            mainCategoryOptions?.data?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                            <div className='addprivacy-inputes'>
                                <label htmlFor="">Question</label>
                                <input type="text" placeholder='Write a question'
                                    value={question}
                                    onChange={(e) => SetQuestion(e.target.value)} />
                            </div>
                            <div className='addprivacy-inputes'>
                                <label htmlFor="">Answer</label>
                                <textarea name="" id="" placeholder='Write answer here'
                                    value={answer}
                                    onChange={(e) => SetAnswer(e.target.value)}>
                                </textarea>
                            </div>

                            <div className='addprivacy-btn'>
                                <div className='partnerprofile-btn'>
                                    <button onClick={() => navigate('/help-Support/faq')}>Cancel</button>
                                </div>
                                <div className='addserivce-btn'>
                                    <button onClick={handleUpdate} disabled={loading}>{loading ? "Saving..." : "Save"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default HOC(EditMainCategoryFAQ)
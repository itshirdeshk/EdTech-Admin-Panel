import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi, putApi } from '../../Repository/Api';


const EditFAQ = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState({});
    const [question, SetQuestion] = useState('');
    const [answer, SetAnswer] = useState('');
    const [loading, setLoading] = useState('');

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
        if (data?.faq) {
            SetQuestion(data?.faq?.question);
            SetAnswer(data?.faq?.answer);
        }
    }, [data]);


    const handleUpdate = async () => {
        const payload = {
            "question": question,
            "answer": answer,
        }

        await putApi(endPoints.updateFAQ(id), payload, {
            setLoading,
            successMsg: 'FAQ updated successfully!',
            errorMsg: 'Failed to update faq!',
        });
        navigate("/support-faqs");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit FAQ</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    <div className='addprivacy-main'>
                        <div className='addprivacy-inputes'>
                            <label htmlFor="">Question</label>
                            <input type="text" placeholder='Write a question'
                                value={question}
                                onChange={(e) => SetQuestion(e.target.value)}
                            />
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
                                <button onClick={handleUpdate} disabled={loading}>{loading ? "Saving..." : "Save"}</button>                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(EditFAQ)
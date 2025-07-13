import React, { useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { postApi } from '../../Repository/Api';

import img from '../../assest/loading1.gif'

const CreatenewFAQ = () => {
    const navigate = useNavigate()
    const [question, SetQuestion] = useState('');
    const [answer, SetAnswer] = useState('');
    const [loading, setLoading] = useState('');


    const handleUpdate = async () => {
        const payload = {
            "question": question,
            "answer": answer,
        }

        await postApi(endPoints.addFaq, payload, {
            setLoading,
            successMsg: 'FAQ added successfully!',
            errorMsg: 'Failed to add faq!',
        });
        navigate("/support-aqs");
    };

    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Create new FAQ</h6>
                    </div>
                </div>
                {loading ?
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                    :
                    <div className='addprivacy-container'>
                        <div className='addprivacy-main'>
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

export default HOC(CreatenewFAQ)
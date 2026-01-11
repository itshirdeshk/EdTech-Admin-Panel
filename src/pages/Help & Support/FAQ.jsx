import { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import img from '../../assest/loading1.gif'


const FAQ = () => {
    const navigate = useNavigate()

    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallFaq, {
            setResponse: setFaqData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch faq data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id) => {
        await deleteApi(endPoints.deletefaq(id), {
            setLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
    };

    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>FAQs</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='addserivce-btn'>
                            <button onClick={() => navigate('/support-faqs/add')}>Create new</button>
                        </div>
                    </div>
                </div>
                <div className='faqcontainer'>
                    {loading ?
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                        :
                        faqData?.faqs?.length === 0 ?
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                            :
                            faqData?.faqs?.map((faq, index) => (
                                <div className='faqlist'>
                                    <div className='faqlistcontent'>
                                        <h6>{faq.question}?</h6>
                                        <p>{faq.answer} </p>
                                    </div>
                                    <div className='faqlisticons'>
                                        <div className='privacypolicyicon' onClick={() => navigate(`/support-faqs/edit/${faq?._id}`)}>
                                            <MdOutlineModeEdit color='#FF5534' size={20} />
                                        </div>
                                        <div className='privacypolicyicon' size={20} onClick={() => handleDelete(faq?._id)}>
                                            <RiDeleteBin6Line color='#FF5534' />
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>

            </div >
        </>
    )
}

export default HOC(FAQ)
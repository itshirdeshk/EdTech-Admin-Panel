import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import img from '../../assest/loading1.gif'


const MainCategoryFAQ = () => {
    const navigate = useNavigate()

    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [maincategoryId, setmainCategoryId] = useState('');


    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);



    const fetchData = useCallback(async () => {
        if (!maincategoryId) {
            setFaqData([]);  // Clear data if no category is selected
            return;
        }

        setFaqData([]); 
        await getApi(endPoints.getfaqbycategoryid(maincategoryId), {
            setResponse: setFaqData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch FAQ data!",
        });
    }, [maincategoryId]);

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
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Help & Support</h6>
                        <div className="addcategory-container">
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
                    </div>
                    <div className='userlist3'>

                        <div className='addserivce-btn'>
                            <button onClick={() => navigate('/help-Support/maincategory-faq/add')}>Create new</button>
                        </div>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/help-Support/support-faq'} className='link'>
                        <div className='servicetnasction'>
                            <h6>Support FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/maincategory-faq'} className='link'>
                        <div className='servicetnasctionactive'>
                            <h6>MainCategory FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/ticket-raised'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Ticket Raised</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/contact-support'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Contact Support</h6>
                        </div>
                    </Link>

                </div>
                <div className="faqcontainer">
                    {loading ? (
                        <div className="normalloading">
                            <img src={img} alt="" />
                        </div>
                    ) : !maincategoryId ? (
                        <div className="normalloading">
                            <p>Please select a main category.</p>
                        </div>
                    ) : Object.keys(faqData?.data || {}).length === 0 ? (
                        <div className="normalloading">
                            <p>No data available.</p>
                        </div>
                    ) : (
                        faqData?.data?.map((faq, index) => (
                            <div className="faqlist" key={index}>
                                <div className="faqlistcontent">
                                    <h6>{faq.question}?</h6>
                                    <p>{faq.answer}</p>
                                </div>
                                <div className="faqlisticons">
                                    <div className="privacypolicyicon" onClick={() => navigate(`/help-Support/maincategory-faq/edit/${faq?._id}`)}>
                                        <MdOutlineModeEdit color="#FF5534" size={20} />
                                    </div>
                                    <div className="privacypolicyicon" size={20} onClick={() => handleDelete(faq?._id)}>
                                        <RiDeleteBin6Line color="#FF5534" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div >
        </>
    )
}

export default HOC(MainCategoryFAQ)
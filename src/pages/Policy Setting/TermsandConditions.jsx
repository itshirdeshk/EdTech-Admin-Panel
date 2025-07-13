import React, { useEffect, useState, useCallback } from "react";
import HOC from '../../components/HOC/HOC'
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";


import img from '../../assest/loading1.gif'


const TermsandConditions = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Stable version of fetchData
    const fetchData = useCallback(async () => {
        await getApi(endPoints.getterms, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch Terms & Condition!",
        });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id) => {
        await deleteApi(endPoints.deleteterms(id), {
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
                        <h6>Terms & Conditions</h6>
                    </div>
                </div>
                {loading ?
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                    :
                    <div className='privacypolicy'>
                        <div className='privacypolicyheader'>
                            <div className='userlist5'>
                                {Object.keys(data.terms || {}).length === 0 && (
                                    <button onClick={() => navigate('/terms-and-conditions/add')}>Create new terms & conditions</button>
                                )}
                            </div>
                            <div className='privacypolicyicon' onClick={() => navigate(`/terms-and-conditions/edit/${data?.terms?.[0]?._id}`)}>
                                <MdOutlineModeEdit color='#FF5534' size={20} />
                            </div>
                            <div className="privacypolicyicon" onClick={() => handleDelete(data?.terms?.[0]?._id)}>
                                <RiDeleteBin6Line color="#FF5534" size={20} />
                            </div>
                        </div>
                        <div className="privacypolicymain">
                            <h6>{data.terms?.[0]?.title || "Terms & Conditions"}</h6>
                            <p>{data.terms?.[0]?.content || "No terms & conditions available."}</p>
                        </div>
                    </div>
                }
            </div >
        </>
    )
}

export default HOC(TermsandConditions)
import React, { useEffect, useState, useCallback } from "react";
import HOC from "../../components/HOC/HOC";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { deleteApi, getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

import img from '../../assest/loading1.gif'

const Privacypolicy = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Stable version of fetchData
    const fetchData = useCallback(async () => {
        await getApi(endPoints.getprivactpolicy, {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch privacy policy!",
        });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id) => {
        await deleteApi(endPoints.deleteprivacypolicy(id), {
            setLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
    };


    return (
        <div className="userlistcontainer">
            <div className="userlist1">
                <div className="userlist2">
                    <h6>Privacy policy</h6>
                </div>
            </div>
            {loading ?
                <div className='normalloading'>
                    <img src={img} alt="" />
                </div>
                :
                <div className="privacypolicy">
                    <div className="privacypolicyheader">
                        <div className="userlist5">
                            {Object.keys(data.privacyPolicies || {}).length === 0 && (
                                <button onClick={() => navigate("/privacy-policy/add-privacy-policy")}>
                                    Create new policy
                                </button>
                            )}

                        </div>
                        <div
                            className="privacypolicyicon"
                            onClick={() => navigate(`/privacy-policy/edit/${data?.privacyPolicies?.[0]?._id}`)}
                        >
                            <MdOutlineModeEdit color="#FF5534" size={20} />
                        </div>
                        <div className="privacypolicyicon" onClick={() => handleDelete(data?.privacyPolicies?.[0]?._id)}>
                            <RiDeleteBin6Line color="#FF5534" size={20} />
                        </div>

                    </div>
                    <div className="privacypolicymain">
                        <h6>{data.privacyPolicies?.[0]?.title || "Privacy Policy"}</h6>
                        <p>{data.privacyPolicies?.[0]?.content || "No privacy policy available."}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default HOC(Privacypolicy);

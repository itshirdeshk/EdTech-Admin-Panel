import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { useNavigate } from 'react-router-dom';
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';


import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";



import img from '../../assest/loading1.gif'

const Banners = () => {
    const navigate = useNavigate()

    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallBanner, {
            setResponse: setBannerData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch Banner data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const handleDelete = async (Id) => {
        await deleteApi(endPoints.deletebanner(Id), {
            successMsg: "Banner deleted successfully!",
            errorMsg: "Failed to delete banner!",
            additionalFunctions: [fetchData],
        });
    };
    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Banners</h6>
                    </div>
                    <div className='userlist3'>
                        <div className='userlist5'>
                            <button onClick={() => navigate('/all-banners/add-banner')}>Add new</button>
                        </div>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Banner</th>
                                    <th>Banner Type</th>
                                    <th>Redirect Test Name</th>
                                    <th>View Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                ) :
                                    bannerData?.banners?.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        bannerData?.banners?.map((banner, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className='bannerimagetable'>
                                                        <img src={banner.url} alt="" />
                                                    </div>

                                                </td>
                                                <td>{banner.type}</td>
                                                <td>{banner.redirectId?.name}</td>
                                                <td style={{ cursor: 'pointer' }}>
                                                    <LuEye color="#000000" size={20} onClick={() => navigate(`/all-banners/view-banner/${banner?._id}`)} />
                                                </td>
                                                <td className='div-icons'>
                                                    <MdDelete onClick={()=>handleDelete(banner?._id)} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(Banners)
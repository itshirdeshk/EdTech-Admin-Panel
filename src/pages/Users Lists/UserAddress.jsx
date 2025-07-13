import React, { useCallback, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import HOC from '../../components/HOC/HOC'
import { useParams } from 'react-router-dom'
import endPoints from '../../Repository/apiConfig'
import { getApi } from '../../Repository/Api'

import img from '../../assest/loading1.gif'


const UserAddress = () => {

    const { id } = useParams()
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    return (
        <>
            <UserProfile active={"Address"} />
            <div className='userspayments'>
                <div className='userlist2' style={{ marginBottom: "1rem" }}>
                    <h6>Address 1</h6>
                </div>
                {loading ? (
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                ) : !userData?.data ? (
                    <div className='normalloading'>
                        <p>No data available.</p>
                    </div>
                ) : (
                    <div className='useraddress-container'>
                        <div className='useraddress-main'>
                            <div className='useraddress-main-header'>
                                <h5>Home (Default)</h5>
                            </div>
                            <div className='useraddress-main-content'>
                                <div className='useraddress-main-content-bottom'>
                                    <span>Location</span>
                                    <span>-</span>
                                    <p>{userData?.data?.data?.address1}</p>
                                </div>
                                <div className='useraddress-main-content-bottom'>
                                    <span>Pincode</span>
                                    <span>-</span>
                                    <p>016109</p>
                                </div>
                                <div className='useraddress-main-content-bottom'>
                                    <span>City</span>
                                    <span>-</span>
                                    <p>{userData?.data?.data?.city?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default HOC(UserAddress)
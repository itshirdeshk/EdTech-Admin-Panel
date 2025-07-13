import React, { useCallback, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import HOC from '../../components/HOC/HOC'
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { useParams } from 'react-router-dom';

import img from '../../assest/loading1.gif';
import { formatDate } from '../../utils/utils';


const UserReferralList = () => {
    const { id } = useParams();
    const [selectedUser, setSelectedUser] = useState(null);


    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10,
    });


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getAllReferraluserTransaction(pagination.currentPage, pagination.limit, id), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.currentPage, pagination.limit, id]);

    useEffect(() => {
        if (Data?.pagination) {
            setPagination((prev) => ({
                ...prev,
                totalPages: Data?.pagination?.totalPages,
                totalDocs: Data?.pagination?.totalItems,
            }));
        }
    }, [Data])

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <>
            <UserProfile active={"Referral list"} />
            <div className='userspayments'>
                <div className='userlist2' style={{ marginBottom: "1rem" }}>
                    <h6>Referral List</h6>
                </div>
                <div className='userbookings-container'>
                    {loading ? (
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                    ) :
                        !Array.isArray(Data?.data) || Data?.data?.length === 0 ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            Data?.data.map((i, index) => (
                                <div className='userbookings-main' key={index}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Referral code</th>
                                                <th>Referral User</th>
                                                <th>Date of referral</th>
                                                <th>Status</th>
                                                <th>Earning</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i?.user?.refferalCode}</td>
                                                <td>{i.name}</td>
                                                <td>{formatDate(i.date)}</td>
                                                <td className={i.status === 'success' ? 'status-complete' : 'status-assigned'}>
                                                    {i.status}
                                                </td>
                                                <td>₹{i?.amount || '---'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )}
                </div>
            </div>
        </>
    )
}

export default HOC(UserReferralList)
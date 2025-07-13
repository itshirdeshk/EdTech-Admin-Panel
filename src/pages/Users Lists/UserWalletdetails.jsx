import React, { useCallback, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import HOC from '../../components/HOC/HOC'
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { useParams } from 'react-router-dom';
import img from '../../assest/loading1.gif'
import { formatDate } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';



const UserWalletdetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);


    const [userwalletData, setUserWalletData] = useState(null)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0,
        limit: 10,
    });


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserwalletbyid(id, pagination.currentPage, pagination.limit), {
            setResponse: setUserWalletData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [id, pagination.currentPage, pagination.limit]);


    useEffect(() => {
        if (userwalletData?.pagination) {
            setPagination((prev) => ({
                ...prev,
                totalPages: userwalletData?.pagination?.totalPages,
                totalDocs: userwalletData?.pagination?.totalItems,
            }));
        }
    }, [userwalletData]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);




    return (
        <>
            <UserProfile active={"Wallet details"} />
            <div className='userspayments'>
                <div className='userspayments-method-content' style={{ margin: '0' }}>
                    <div className='userprofile-content-inputes'>
                        <label htmlFor="">Wallet balance</label>
                        <input type="text" value={userwalletData?.data?.[0]?.user.wallet} />
                    </div>
                </div>
                <div className='userlist2' style={{ marginTop: '1.5rem', marginBottom: "1rem" }}>
                    <h6>Wallet Transactions</h6>
                </div>
                <div className='userbookings-container'>
                    {loading ? (
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                    ) :
                        !Array.isArray(userwalletData?.data) || userwalletData?.data?.length === 0 ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            userwalletData?.data?.map((i, index) => (
                                <div className='userbookings-main' key={index}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Date</th>
                                                <th>Transaction Type</th>
                                                <th>Amount</th>
                                                <th>Payment Mode</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#{i?.orderId?.orderId || 'N/A'}</td>
                                                <td>{formatDate(i.date)}</td>
                                                <td>{i.type}</td>
                                                <td>₹{i.amount}</td>
                                                <td>{i.paymentMode}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )}
                </div>
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalDocs={pagination.totalDocs}
                    onPageChange={(newPage) =>
                        setPagination((prev) => ({ ...prev, currentPage: newPage }))
                    }
                />
            </div>
        </>
    )
}

export default HOC(UserWalletdetails)
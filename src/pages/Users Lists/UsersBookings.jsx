import React, { useCallback, useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import HOC from '../../components/HOC/HOC';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { useParams } from 'react-router-dom';
import img from '../../assest/loading1.gif';
import { formatDate } from '../../utils/utils';

const UsersBookings = () => {
    const { id } = useParams();
    const [userbookingData, setUserBookingData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserbookingbyid(id), {
            setResponse: setUserBookingData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    return (
        <>
            <UserProfile active="Bookings" />
            <div className='userspayments'>
                <div className='userbookings-container'>
                    {loading ? (
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                    ) :
                        !Array.isArray(userbookingData?.data) || userbookingData?.data?.length === 0 ? (
                            <div className='normalloading'>
                                <p>No data available.</p>
                            </div>
                        ) : (
                            userbookingData?.data?.map((i, index) => (
                                <div className='userbookings-main' key={index}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Service</th>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Duration</th>
                                                <th>Assigned to</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#{i?.orderId}</td>
                                                <td>{i?.services?.[0]?.serviceId?.title}</td>
                                                <td>{i?.services?.[0]?.serviceId?.categoryId?.name}</td>
                                                <td>{formatDate(i?.Date)}</td>
                                                <td>{i?.services?.[0]?.serviceId?.totalTime}</td>
                                                <td>{i?.partnerId?.fullName}</td>
                                                <td>₹{i.totalAmount}</td>
                                                <td className={i.status === 'Complete' ? 'status-complete' : 'status-assigned'}>
                                                    {i.status}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )}
                </div>
            </div>
        </>
    );
};

export default HOC(UsersBookings);

import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link, useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi, putApi } from '../../Repository/Api';

import img from '../../assest/loading1.gif'

const TicketraisedDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getticketbyid(id), {
            setResponse: setTicketData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch ticket raised data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdate = async () => {
        await putApi(endPoints.updateCloseTicket(id), {
            setLoading,
            successMsg: 'Ticket Closed successfully!',
            errorMsg: 'Failed to close ticket!',
        });
        navigate("/help-Support/ticket-raised");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return formattedDate;
    };

    return (

        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Ticket raised</h6>
                    </div>
                </div>

                <div className='addprivacy-container'>
                    {loading ?
                        <div className='normalloading'>
                            <img src={img} alt="" />
                        </div>
                        :
                        <div className='addprivacy-main'>
                            <div className='ticketraised-details'>
                                <div className='ticketraised-details-inputes'>
                                    <label htmlFor="">Complained by</label>
                                    <input type="text" value={ticketData?.data?.userId?.fullName} />
                                </div>
                                <div className='ticketraised-details-inputes'>
                                    <label htmlFor="">User type</label>
                                    <input type="text" value={ticketData?.data?.userId?.userType} />
                                </div>
                                <div className='ticketraised-details-inputes'>
                                    <label htmlFor="">Ticket ID</label>
                                    <input type="text" value={ticketData?.data?.tiketId} />
                                </div>
                                <div className='ticketraised-details-inputes'>
                                    <label htmlFor="">Ticket Status</label>
                                    <input type="text" value={ticketData?.data?.close ? "Closed" : 'Active'} />
                                </div>
                                <div className='ticketraised-details-inputes'>
                                    <label htmlFor="">Complaint date</label>
                                    <input type="text" value={formatDate(ticketData?.data?.createdAt)} />
                                </div>
                                <div className='ticketraised-details-inputes'>
                                    <label htmlFor="">Response if any</label>
                                    <input type="text" value={ticketData?.data?.userId?.fullName} />
                                </div>
                                <div className='ticketraised-details-inputes'>
                                    <label htmlFor="">Complaint </label>
                                    <textarea name="" id="" value={ticketData?.data?.description}></textarea>
                                </div>
                            </div>
                            {!ticketData?.data?.close &&
                                <div className='addprivacy-btn'>
                                    <div className='addserivce-btn'>
                                        <button onClick={handleUpdate} disabled={loading}>{loading ? "Closing..." : "Close this Ticket"}</button>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default HOC(TicketraisedDetails)
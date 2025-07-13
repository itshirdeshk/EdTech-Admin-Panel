import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { Link, useNavigate } from 'react-router-dom';
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import { MdOutlineRemoveRedEye } from "react-icons/md";

import img from '../../assest/loading1.gif'


const TicketRaised = () => {
    const navigate = useNavigate();
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = useCallback(async () => {
        await getApi(endPoints.getallTicket, {
            setResponse: setTicketData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch ticket raised data!",
        })
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Add 5 hours and 30 minutes to convert UTC to IST
        date.setHours(date.getHours() + 5);
        date.setMinutes(date.getMinutes() + 30);

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return formattedDate;
    };

    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Help & Support</h6>
                    </div>
                </div>

                <div className='servicetnasctioncontainer'>
                    <Link to={'/help-Support/support-faq'} className='link'>
                        <div className='servicetnasction'>
                            <h6>FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/maincategory-faq'} className='link'>
                        <div className='servicetnasction'>
                            <h6>MainCategory FAQ</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/ticket-raised'} className='link'>
                        <div className='servicetnasctionactive' >
                            <h6>Ticket Raised</h6>
                        </div>
                    </Link>
                    <Link to={'/help-Support/contact-support'} className='link'>
                        <div className='servicetnasction' >
                            <h6>Contact Support</h6>
                        </div>
                    </Link>

                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Ticket Title</th>
                                    <th>Ticket Description</th>
                                    <th>User Type</th>
                                    <th>Send By</th>
                                    <th>Phone Number</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ?
                                    <tr>
                                        <td colSpan="7" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                    :
                                    (!ticketData?.data || ticketData?.data?.length === 0 || ticketData?.status === 404) ?
                                        <tr>
                                            <td colSpan="7" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                        :
                                        ticketData?.data?.map((ticket, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {ticket.tiketId}
                                                </td>
                                                <td>{ticket.title}</td>
                                                <td>{ticket.description}</td>
                                                <td>{ticket?.userId?.userType}</td>
                                                <td>{ticket?.userId?.fullName}</td>
                                                <td>{ticket?.userId?.phone}</td>
                                                <td>{formatDate(ticket.createdAt)}</td>
                                                <td
                                                    style={{
                                                        color: ticket.close ? '#3FB031'
                                                            : '#B60B0B'
                                                    }}
                                                >
                                                    {ticket.close ? "Closed" : 'Active'}
                                                </td>
                                                <td className='div-icons'>
                                                    <MdOutlineRemoveRedEye onClick={()=>navigate(`/help-Support/ticket-raised/details/${ticket?._id}`)}/>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}

export default HOC(TicketRaised)
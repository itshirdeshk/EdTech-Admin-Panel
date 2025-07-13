import React, { useCallback, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import HOC from '../../components/HOC/HOC'
import { useParams } from 'react-router-dom';
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';



const UserPayment = () => {
    const { id } = useParams();
    const [userCardsData, setUserCardData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserbookingbyid(id), {
            setResponse: setUserCardData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    return (
        <>
            <UserProfile active={"Payment"} />
            <div className='userspayments'>
                {/* <div className='userspayments-methods'>
                    <div
                        className={`userspayments-method ${activeMethod === 'PayPal' ? 'userspayments-method-active' : ''
                            }`}
                        onClick={() => toggle('PayPal')}
                    >
                        <FaPaypal />
                        <p>App</p>
                    </div>
                    <div
                        className={`userspayments-method ${activeMethod === 'Card' ? 'userspayments-method-active' : ''
                            }`}
                        onClick={() => toggle('Card')}
                    >
                        <IoMdCard />
                        <p>Card</p>
                    </div>
                    <div
                        className={`userspayments-method ${activeMethod === 'Wallet' ? 'userspayments-method-active' : ''
                            }`}
                        onClick={() => toggle('Wallet')}
                    >
                        <LuWallet />
                        <p>Wallet</p>
                    </div>
                </div> */}
                <div className='userlist2'>
                    <h6>Card details</h6>
                </div>
                <div className='userspayments-method-content'>
                    <div className='userprofile-content-inputes'>
                        <label htmlFor="">Card number</label>
                        <input type="text" />
                    </div>
                    <div className='userprofile-content-inputes'>
                        <label htmlFor="">Name</label>
                        <input type="text" />
                    </div>
                    <div className='userprofile-content-inputes'>
                        <label htmlFor="">Card type</label>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(UserPayment)
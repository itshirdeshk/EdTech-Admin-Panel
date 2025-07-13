import { Link, useParams } from "react-router-dom";

const Usermultipleroutes = ({ active }) => {
    const { id } = useParams();

    const routes = [
        { name: "Bookings", path: `/userslists/user-profile/bookings/${id}` },
        { name: "Wallet details", path: `/userslists/user-profile/wallet-details/${id}` },
        { name: "Referral list", path: `/userslists/user-profile/referral-list/${id}` },
        { name: "Address", path: `/userslists/user-profile/address/${id}` },
    ];


    return (
        <div className='usermultipleroutes-container'>
            <div className='usermultipleroutes-main'>
                {routes.map((route, index) => (
                    <Link to={route.path} className='link' key={index}>
                        <div className='usermultipleroutes-div'>
                            <h6 className={active === route.name ? 'usermultipleroutes-text-active' : 'usermultipleroutes-text'}>
                                {route.name}
                            </h6>
                            {active === route.name && <div className='usermultipleroutes-line-active'></div>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default Usermultipleroutes;

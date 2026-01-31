import { useState } from 'react';
import HOC from '../../components/HOC/HOC';
import { useNavigate } from 'react-router-dom';
import { putApi } from '../../Repository/Api';  // Import postApi for the new API
import endPoints from '../../Repository/apiConfig';
import { useAdmin } from './AdminContext';
import img1 from '../../assest/loading1.gif';

const AdminProfile = () => {
    const { adminProfile, loading, refreshAdminData } = useAdmin();
    const navigate = useNavigate();
    const [loading1, setLoading1] = useState(false);
    const [firstName, setFirstName] = useState(adminProfile?.admin?.firstName || "");
    const [lastName, setLastName] = useState(adminProfile?.admin?.lastName || "");
    const [email, setEmail] = useState(adminProfile?.admin?.email || "");
    const [phone, setPhone] = useState(adminProfile?.admin?.phone || "");
    const [password, setPassword] = useState("");


    const handleUpdate = async () => {
        setLoading1(true);

        const payload = {
            "fullName": `${firstName} ${lastName}`,
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "email": email,
        };

        if (password) {
            payload.password = password;
        }

        await putApi(endPoints.updateadminprofile, payload, {
            setLoading: setLoading1,
            successMsg: 'Admin Profile updated successfully!',
            errorMsg: 'Failed to update admin profile!',
        });

        refreshAdminData();
        setLoading1(false);
    };


    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Admin Profile</h6>
                    </div>
                </div>
                <div className='settings-container'>
                    {loading ? (
                        <div className='normalloading'>
                            <img src={img1} alt="Loading..." />
                        </div>
                    ) : (
                        <div className='settings-main'>
                            <div className='setting-main-main'>
                                <div className='settings-content'>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">First Name</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Email</label>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Phone</label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className='userprofile-content-inputes'>
                                        <label htmlFor="">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='contactsupport-btn'>
                                <div className='partnerprofile-btn'>
                                    <button onClick={() => navigate(-1)}>Cancel</button>
                                </div>
                                <div className='addserivce-btn'>
                                    <button
                                        disabled={loading1}
                                        onClick={handleUpdate}>
                                        {loading1 ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HOC(AdminProfile);

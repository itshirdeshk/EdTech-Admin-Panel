import React, { useCallback, useEffect, useState } from "react";
import endPoints from "../../Repository/apiConfig";
import { getApi, postApi } from "../../Repository/Api";
import img from '../../assest/loading1.gif';
import Pagination from '../../components/Pagination/Pagination';

const Notificationsend = ({ fetchData }) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [sendToAll, setSendToAll] = useState(true);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        totalDocs: 0,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch users
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        await getApi(
            endPoints.getallUser(pagination.page, pagination.limit, searchQuery),
            {
                setResponse: setUserData,
                setLoading: setLoading,
                errorMsg: "Failed to fetch users!",
            }
        );
        setLoading(false);
    }, [pagination.page, pagination.limit, searchQuery]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            totalPages: userData?.pagination?.totalPages || 1,
            totalDocs: userData?.pagination?.totalDocs || 0,
        }));
    }, [userData]);

    const handleUserSelect = (userId) => {
        if (selectedUserIds.includes(userId)) {
            setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
        } else {
            setSelectedUserIds([...selectedUserIds, userId]);
        }
    };

    const handleSelectAllOnPage = () => {
        const idsOnPage = (userData?.users || []).map((user) => user._id);
        const allSelected = idsOnPage.every((id) => selectedUserIds.includes(id));
        if (allSelected) {
            setSelectedUserIds(selectedUserIds.filter((id) => !idsOnPage.includes(id)));
        } else {
            setSelectedUserIds([...new Set([...selectedUserIds, ...idsOnPage])]);
        }
    };

    const handleSendToAllChange = (e) => {
        setSendToAll(e.target.checked);
        if (e.target.checked) setSelectedUserIds([]);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setSearchQuery("");
            setPagination((prev) => ({ ...prev, page: 1 }));
        }
    };
    const handleSearch = () => {
        setSearchQuery(search);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!title.trim() || !message.trim()) {
            setError("Title and message are required.");
            return;
        }
        setSending(true);
        const body = {
            title,
            message,
            recipients: sendToAll ? [] : selectedUserIds,
            ...(sendToAll ? { isForAll: true } : {})
        };
        await postApi(
            endPoints.sendNotification,
            body,
            {
                setLoading: setSending,
                successMsg: "Notification sent successfully!",
                errorMsg: "Failed to send notification!",
                additionalFunctions: [fetchData],
            }
        );
        setSuccess("Notification sent successfully!");
        setTitle("");
        setMessage("");
        setSelectedUserIds([]);
        setSendToAll(true);
        setSending(false);
    };    return (
        <div className="userlistcontainer">
            <div className="userlist1">
                <div className="userlist2">
                    <h6>Send Push Notification</h6>
                </div>
            </div>
            
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', margin: '20px 0' }}>
                <form onSubmit={handleSubmit}>
                    {/* Form Fields Section */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '20px',
                        marginBottom: '24px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ 
                                fontWeight: '600', 
                                marginBottom: '8px',
                                color: '#333',
                                fontSize: '14px'
                            }}>
                                Notification Title *
                            </label>
                            <input
                                type="text"
                                placeholder="Enter notification title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ 
                                fontWeight: '600', 
                                marginBottom: '8px',
                                color: '#333',
                                fontSize: '14px'
                            }}>
                                Message *
                            </label>
                            <textarea
                                placeholder="Enter notification message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                style={{
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.3s',
                                    resize: 'vertical',
                                    minHeight: '100px'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                        </div>
                    </div>

                    {/* Send to All Toggle */}
                    <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            flexWrap: 'wrap'
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#333',
                                userSelect: 'none'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={sendToAll}
                                    onChange={handleSendToAllChange}
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        cursor: 'pointer'
                                    }}
                                />
                                Send to all users
                            </label>
                            {!sendToAll && selectedUserIds.length > 0 && (
                                <span style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                }}>
                                    {selectedUserIds.length} user{selectedUserIds.length !== 1 ? 's' : ''} selected
                                </span>
                            )}
                        </div>
                        {!sendToAll && (
                            <p style={{
                                margin: '8px 0 0 26px',
                                fontSize: '14px',
                                color: '#666'
                            }}>
                                Select specific users to send the notification to
                            </p>
                        )}
                    </div>

                    {/* User Selection Section */}
                    {!sendToAll && (
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px',
                                flexWrap: 'wrap',
                                gap: '12px'
                            }}>
                                <h6 style={{ margin: 0, color: '#333', fontSize: '16px' }}>Select Users</h6>
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    <input
                                        type="search"
                                        placeholder="Search by name, email, or phone"
                                        value={search}
                                        onChange={handleSearchChange}
                                        style={{
                                            padding: '8px 12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '14px',
                                            outline: 'none',
                                            minWidth: '250px'
                                        }}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={handleSearch}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}>
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead style={{ backgroundColor: '#f8f9fa', position: 'sticky', top: 0 }}>
                                            <tr>
                                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', width: '50px' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={(userData?.users || []).length > 0 && (userData?.users || []).every((user) => selectedUserIds.includes(user._id))}
                                                        onChange={handleSelectAllOnPage}
                                                        style={{ width: '16px', height: '16px' }}
                                                    />
                                                </th>
                                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: '600' }}>Name</th>
                                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: '600' }}>Email</th>
                                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: '600' }}>Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center' }}>
                                                        <img src={img} alt="Loading..." style={{ width: '40px' }} />
                                                    </td>
                                                </tr>
                                            ) : (userData?.users || []).length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                                                        No users found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                userData.users.map((user, index) => (
                                                    <tr key={user._id} style={{
                                                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedUserIds.includes(user._id)}
                                                                onChange={() => handleUserSelect(user._id)}
                                                                style={{ width: '16px', height: '16px' }}
                                                            />
                                                        </td>
                                                        <td style={{ padding: '12px', borderBottom: '1px solid #eee', fontWeight: '500' }}>{user.name}</td>
                                                        <td style={{ padding: '12px', borderBottom: '1px solid #eee', color: '#666' }}>{user.email}</td>
                                                        <td style={{ padding: '12px', borderBottom: '1px solid #eee', color: '#666' }}>{user.phone}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '16px' }}>
                                <Pagination
                                    currentPage={pagination.page}
                                    totalPages={pagination.totalPages}
                                    totalDocs={pagination.totalDocs}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* Error and Success Messages */}
                    {error && (
                        <div style={{
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #f5c6cb',
                            marginBottom: '16px'
                        }}>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div style={{
                            backgroundColor: '#d4edda',
                            color: '#155724',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #c3e6cb',
                            marginBottom: '16px'
                        }}>
                            {success}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '12px',
                        paddingTop: '20px',
                        borderTop: '1px solid #eee'
                    }}>
                        <button 
                            type="submit" 
                            disabled={sending}
                            style={{
                                padding: '12px 32px',
                                backgroundColor: sending ? '#6c757d' : '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: sending ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: '500',
                                minWidth: '150px',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            {sending ? "Sending..." : "Send Notification"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Notificationsend;

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
    };

    return (
        <div className="userprofilecontainer">
            <div className="userprofile-header">
                <h6>Send Notification</h6>
            </div>
            <form className="notificationsendcontainer" onSubmit={handleSubmit}>
                <div className="notificationsend">
                    <div className="notificationsendinputs">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Enter notification title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="notificationsendinputs">
                        <label>Message</label>
                        <textarea
                            placeholder="Enter notification message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div className="notificationsendinputs" style={{ marginTop: 16 }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={sendToAll}
                                onChange={handleSendToAllChange}
                            />
                            Send to everyone
                        </label>
                    </div>
                </div>
                {!sendToAll && (
                    <div className="notificationsendinputs" style={{ marginTop: 16, width: '100%' }}>
                        <label>Select Users</label>
                        <div className="search-container" style={{ marginBottom: 8 }}>
                            <input
                                type="search"
                                placeholder="Search by name, email, or phone"
                                value={search}
                                onChange={handleSearchChange}
                                style={{ width: 200 }}
                            />
                            <button type="button" className="search-button" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                        <div className="bottomdashboard3" style={{ maxHeight: 300, overflowY: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                checked={(userData?.users || []).length > 0 && (userData?.users || []).every((user) => selectedUserIds.includes(user._id))}
                                                onChange={handleSelectAllOnPage}
                                            />
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="tableloading">
                                                <img src={img} alt="Loading..." />
                                            </td>
                                        </tr>
                                    ) : (userData?.users || []).length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="tableloading">
                                                <p>No users found.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        userData.users.map((user) => (
                                            <tr key={user._id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUserIds.includes(user._id)}
                                                        onChange={() => handleUserSelect(user._id)}
                                                    />
                                                </td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            totalDocs={pagination.totalDocs}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
                {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
                <div className="addserivce-btn" style={{ marginTop: 24 }}>
                    <button type="submit" disabled={sending}>
                        {sending ? "Sending..." : "Send Notification"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Notificationsend;

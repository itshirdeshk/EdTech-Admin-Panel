import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import FilterDropdown from '../../components/Filter Dropdown/FilterDropdown';
import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';

import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

import img from '../../assest/loading1.gif'


import Pagination from "../../components/Pagination/Pagination";

import { MdDelete } from "react-icons/md";
import { formatDate } from '../../utils/utils';
import { IoMdEye } from "react-icons/io";
import { toast } from 'react-toastify';

const UsersLists = () => {
    const [userData, setUserData] = useState([]);
    const [filtersExams, setFilterExam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });
    const [showPremiumOnly, setShowPremiumOnly] = useState(false);
    const [showBlockedOnly, setShowBlockedOnly] = useState(false);

    const navigate = useNavigate()

    const fetchData = useCallback(async () => {
        setUserData([])
        await getApi(
            endPoints.getallUser(
                pagination.page,
                pagination.limit,
                searchQuery,
                selectedFilter,
                showPremiumOnly ? true : undefined,
                showBlockedOnly ? true : undefined
            ),
            {
                setResponse: setUserData,
                setLoading: setLoading,
                errorMsg: "Failed to fetch user data!",
            }
        )
    }, [pagination.page, pagination.limit, searchQuery, selectedFilter, showPremiumOnly, showBlockedOnly]);

    const fetchExamData = useCallback(async () => {
        setFilterExam([])
        await getApi(endPoints.getAllExams(1, 50), {
            setResponse: setFilterExam,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [])

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: userData?.pagination?.totalPages,
            hasPrevPage: userData?.pagination?.hasPrevPage,
            hasNextPage: userData?.pagination?.hasNextPage,
        }));
    }, [userData]);


    const handleDelete = async (userId) => {
        await deleteApi(endPoints.deleteuser(userId), {
            successMsg: "User deleted successfully!",
            errorMsg: "Failed to delete user!",
            additionalFunctions: [fetchData],
        });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === "") {
            setSearchQuery("");
            setPagination((prev) => ({ ...prev, page: 1 }));
        }
    };

    const handleSearch = () => {
        setSearchQuery(search);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchExamData();
    }, [fetchExamData]);

    return (
        <>
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>Users Lists</h6>
                    </div>
                    <div className='userlist3'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {/* Premium Filter Toggle */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <span>Premium</span>
                                <span className="switch">
                                    <input
                                        type="checkbox"
                                        checked={showPremiumOnly}
                                        onChange={() => {
                                            setShowPremiumOnly((prev) => !prev);
                                            setPagination((prev) => ({ ...prev, page: 1 }));
                                        }}
                                    />
                                    <span className="slider round"></span>
                                </span>
                            </label>
                            {/* Blocked Filter Toggle */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <span>Blocked</span>
                                <span className="switch">
                                    <input
                                        type="checkbox"
                                        checked={showBlockedOnly}
                                        onChange={() => {
                                            setShowBlockedOnly((prev) => !prev);
                                            setPagination((prev) => ({ ...prev, page: 1 }));
                                        }}
                                    />
                                    <span className="slider round"></span>
                                </span>
                            </label>
                            {/* Existing FilterDropdown and search */}
                            <div className="search-container">
                                <div className="userlist4">
                                    <IoSearch className="search-icon" />
                                    <input
                                        type="search"
                                        placeholder="Search by name, email, and phone"
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <button className="search-button" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                            <FilterDropdown
                                filters={filtersExams?.exams}
                                selectedFilter={selectedFilter || "Choose Filter"}
                                onFilterSelect={(filter) => {
                                    setSelectedFilter(filter?._id || "");
                                    setPagination((prev) => ({ ...prev, page: 1 }));
                                }}
                                resetLabel="Reset Filter"
                            />
                        </div>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Name</th>
                                    <th>Email ID</th>
                                    <th>Phone No.</th>
                                    <th>Joined Date</th>
                                    <th>Premium</th>
                                    <th>Blocked</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ?
                                    <tr>
                                        <td colSpan="9" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                    :
                                    (!userData?.users || userData?.users.length === 0) ? (
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                    ) :
                                        userData?.users?.map((user, index) => (
                                            <tr key={index}>
                                                <td>#{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                                <td>{user?.name}</td>
                                                <td>{user?.email || 'N/A'}</td>
                                                <td>{user?.phone || 'N/A'}</td>
                                                <td>{formatDate(user?.createdAt)}</td>
                                                <td>
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={user?.isPremium || false}
                                                            onChange={async () => {
                                                                try {
                                                                    if (user?.isPremium) {
                                                                        await getApi(endPoints.makeUserNormal(user._id), {
                                                                            successMsg: 'User set to normal successfully!',
                                                                            errorMsg: 'Failed to set user to normal!',
                                                                            additionalFunctions: [fetchData],
                                                                        });
                                                                    } else {
                                                                        await getApi(endPoints.makeUserPremium(user._id), {
                                                                            successMsg: 'User set to premium successfully!',
                                                                            errorMsg: 'Failed to set user to premium!',
                                                                            additionalFunctions: [fetchData],
                                                                        });
                                                                    }
                                                                } catch (err) {
                                                                    toast.error('Operation failed!');
                                                                }
                                                            }}
                                                        />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={user?.isBlocked}
                                                            onChange={async () => {
                                                                try {
                                                                    if (user?.isBlocked) {
                                                                        await getApi(endPoints.unblockUser(user._id), {
                                                                            successMsg: 'User unblocked successfully!',
                                                                            errorMsg: 'Failed to unblock user!',
                                                                            additionalFunctions: [fetchData],
                                                                        });
                                                                    } else {
                                                                        await getApi(endPoints.blockUser(user._id), {
                                                                            successMsg: 'User blocked successfully!',
                                                                            errorMsg: 'Failed to block user!',
                                                                            additionalFunctions: [fetchData],
                                                                        });
                                                                    }
                                                                } catch (err) {
                                                                    toast.error('Operation failed!');
                                                                }
                                                            }}
                                                        />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </td>
                                                <td className='div-icons'>
                                                    <IoMdEye onClick={() => navigate(`/user-profile/${user._id}`)} />
                                                    <MdDelete onClick={() => handleDelete(user._id)} />
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <Pagination
                currentPage={userData?.pagination?.currentPage}
                totalPages={userData?.pagination?.totalPages}
                totalDocs={userData?.pagination?.totalDocs}
                onPageChange={(newPage) =>
                    setPagination((prev) => ({ ...prev, currentPage: newPage }))
                }
            />


        </>
    )
}

export default HOC(UsersLists)
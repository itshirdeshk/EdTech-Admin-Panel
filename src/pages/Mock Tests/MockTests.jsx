import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { AddMockTests } from '../../components/Modals/Modals';

import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { IoSearch } from "react-icons/io5";


import img from '../../assest/loading1.gif'


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatDate } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';




const MockTests = () => {

    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const fetchData = useCallback(async () => {
        setData([])
        await getApi(endPoints.getAllMockTests(pagination.page, pagination.limit, searchQuery), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit, searchQuery])


    const handleDelete = async (categoryId) => {
        if (!categoryId) return;
        await deleteApi(endPoints.deleteMockTests(categoryId), {
            setLoading,
            successMsg: 'Data deleted successfully!',
            errorMsg: 'Failed to delete data!',
        });
        fetchData();
    };

    // Modal Openers
    const openAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal(true);
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


    // Initial Data Fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <>
            <AddMockTests
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>All Mock Tests</h6>
                    </div>
                    <div className='userlist3'>
                        <div className="search-container">
                            <div className="userlist4">
                                <IoSearch className="search-icon" />
                                <input
                                    type="search"
                                    placeholder="Search by name"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <button className="search-button" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='userlist5'>
                        <button onClick={openAddModal}>Add</button>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Test Series Name</th>
                                    <th>Total Tests</th>
                                    <th>Free Tests</th>
                                    <th>Created Date</th>
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
                                    Data?.mockTests?.length === 0 ?
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                        :
                                        Data?.mockTests?.map((i, index) => (
                                            <tr key={index}>
                                                <td>#{index + 1}</td>
                                                <td>{i?.name}</td>
                                                <td>{i?.testSeries?.name}</td>
                                                <td>{i?.totalTests}</td>
                                                <td>{i?.freeTests}</td>
                                                <td>{formatDate(i?.createdAt)}</td>
                                                <td className='div-icons'>
                                                    <FaEdit onClick={() => openEditModal(i)} />
                                                    <MdDelete onClick={() => handleDelete(i._id)} />
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            <Pagination
                currentPage={Data?.pagination?.currentPage}
                totalPages={Data?.pagination?.totalPages}
                totalDocs={Data?.pagination?.totalDocs}
                onPageChange={(newPage) =>
                    setPagination((prev) => ({ ...prev, currentPage: newPage }))
                }
            />

        </>
    )
}

export default HOC(MockTests)
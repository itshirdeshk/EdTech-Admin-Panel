import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { AddQuestion, ViewDescription } from '../../components/Modals/Modals';

import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { IoSearch } from "react-icons/io5";


import img from '../../assest/loading1.gif'


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatDate } from '../../utils/utils';
import { FaEye } from "react-icons/fa";
import Pagination from '../../components/Pagination/Pagination';




const Allquestions = () => {

    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
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
        await getApi(endPoints.getallQuestions(pagination.page, pagination.limit, searchQuery), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit, searchQuery])

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: Data?.pagination?.totalPages,
            hasPrevPage: Data?.pagination?.hasPrevPage,
            hasNextPage: Data?.pagination?.hasNextPage,
        }));
    }, [Data]);


    const handleDelete = async (categoryId) => {
        if (!categoryId) return;
        await deleteApi(endPoints.deleteQuestion(categoryId), {
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


    // Initial Data Fetch

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

    const openDescriptionModal = (data) => {
        setSelectedItem(data);
        setShowModal1(true)
    };

    const truncateText = (htmlString, maxLength) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlString;
        const textContent = tempElement.textContent || tempElement.innerText || "";

        return textContent.length > maxLength ? `${textContent.slice(0, maxLength)}...` : textContent;
    };

    return (
        <>
            <AddQuestion
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <ViewDescription
                show={showModal1}
                onHide={() => setShowModal1(false)}
                data={selectedItem}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>All Questions</h6>
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
                                    <th>Question</th>
                                    <th>Options</th>
                                    <th>Test Name</th>
                                    <th>Positive Marks</th>
                                    <th>Negative Marks</th>
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
                                    Data?.questions?.length === 0 ?
                                        <tr>
                                            <td colSpan="9" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                        :
                                        Data?.questions?.map((i, index) => (
                                            <tr key={index}>
                                                <td>#{index + 1}</td>
                                                <td>
                                                    <span dangerouslySetInnerHTML={{ __html: truncateText(i?.title, 15) }} />
                                                </td>
                                                <td>{i?.options?.[0]?.text}</td>
                                                <td>{i?.test?.title}</td>
                                                <td>{i?.positiveMarks}</td>
                                                <td>{i?.negativeMarks}</td>
                                                <td>{formatDate(i?.createdAt)}</td>
                                                <td className='div-icons'>
                                                    <FaEye onClick={() => openDescriptionModal(i)} />
                                                    <FaEdit onClick={() => openEditModal(i)} />
                                                    <MdDelete onClick={() => handleDelete(i?._id)} />
                                                </td>

                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalDocs={Data?.pagination?.totalDocs}
                onPageChange={(newPage) =>
                    setPagination((prev) => ({ ...prev, page: newPage }))
                }
            />
        </>
    )
}

export default HOC(Allquestions)
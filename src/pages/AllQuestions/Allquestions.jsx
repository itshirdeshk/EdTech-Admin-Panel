import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { AddQuestion, ViewDescription } from '../../components/Modals/Modals';

import { deleteApi, getApi, postApi } from '../../Repository/Api';
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
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [testList, setTestList] = useState([]);
    const [selectedTest, setSelectedTest] = useState("");
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });



    const fetchData = useCallback(async () => {
        setData([])
        await getApi(endPoints.getallQuestions(pagination.page, pagination.limit, searchQuery, selectedTest), {
            setResponse: setData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit, searchQuery, selectedTest])

    const fetchTestList = useCallback(async () => {
        await getApi(endPoints.getAllTests(1, 1000, ""), {
            setResponse: setTestList,
            setLoading: () => {},
            errorMsg: "Failed to fetch tests!",
        })
    }, [])

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

    const handleBulkDelete = async () => {
        if (selectedQuestions.length === 0) {
            alert("Please select at least one question to delete");
            return;
        }
        
        if (!window.confirm(`Are you sure you want to delete ${selectedQuestions.length} question(s)?`)) {
            return;
        }

        await postApi(endPoints.deleteBulkQuestions, 
            { questionIds: selectedQuestions },
            {
                setLoading,
                successMsg: 'Questions deleted successfully!',
                errorMsg: 'Failed to delete questions!',
            }
        );
        setSelectedQuestions([]);
        fetchData();
    };

    const handleSelectQuestion = (questionId) => {
        setSelectedQuestions(prev => {
            if (prev.includes(questionId)) {
                return prev.filter(id => id !== questionId);
            } else {
                return [...prev, questionId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedQuestions.length === Data?.questions?.length) {
            setSelectedQuestions([]);
        } else {
            setSelectedQuestions(Data?.questions?.map(q => q._id));
        }
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

    useEffect(() => {
        fetchTestList();
    }, [fetchTestList]);

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
                        <div style={{ marginLeft: '10px' }}>
                            <select 
                                className="form-select" 
                                value={selectedTest} 
                                onChange={(e) => {
                                    setSelectedTest(e.target.value);
                                    setPagination((prev) => ({ ...prev, page: 1 }));
                                    setSelectedQuestions([]);
                                }}
                                style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ccc' }}
                            >
                                <option value="">All Tests</option>
                                {testList?.tests?.map((test) => (
                                    <option key={test._id} value={test._id}>
                                        {test.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='userlist5'>
                        {selectedQuestions.length > 0 && (
                            <button onClick={handleBulkDelete} style={{ marginRight: '10px', backgroundColor: '#dc3545' }}>
                                Delete Selected ({selectedQuestions.length})
                            </button>
                        )}
                        <button onClick={openAddModal}>Add</button>
                    </div>
                </div>
                <div className='userlist6'>
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={selectedQuestions.length === Data?.questions?.length && Data?.questions?.length > 0}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
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
                                        <td colSpan="10" className='tableloading'>
                                            <img src={img} alt="" />
                                        </td>
                                    </tr>
                                    :
                                    Data?.questions?.length === 0 ?
                                        <tr>
                                            <td colSpan="10" className='tableloading'>
                                                <p>No data available.</p>
                                            </td>
                                        </tr>
                                        :
                                        Data?.questions?.map((i, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedQuestions.includes(i._id)}
                                                        onChange={() => handleSelectQuestion(i._id)}
                                                    />
                                                </td>
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
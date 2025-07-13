import React, { useCallback, useEffect, useState } from 'react'
import HOC from '../../components/HOC/HOC'
import { AddResource } from '../../components/Modals/Modals';

import { deleteApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { IoSearch } from "react-icons/io5";


import img from '../../assest/loading1.gif'


import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { FaDownload } from 'react-icons/fa';
import Pagination from '../../components/Pagination/Pagination';
import { saveAs } from 'file-saver';



const AllResources = () => {

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
        await getApi(endPoints.getallResources(pagination.page, pagination.limit, searchQuery), {
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
        if (!selectedItem) return;
        await deleteApi(endPoints.deleteResources(categoryId), {
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
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDownload = async (resource) => {
        try {
            const response = await fetch(resource.url);
            const blob = await response.blob();
            // Try to get extension from typeOfFile or fallback to blob type
            let ext = '';
            if (resource.typeOfFile) {
                ext = '.' + resource.typeOfFile.toLowerCase().replace('application/', '').replace('image/', '').replace('vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx').replace('vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx').replace('msword', 'doc').replace('pdf', 'pdf');
            } else if (blob.type) {
                ext = '.' + blob.type.split('/').pop();
            }
            let filename = resource.title ? resource.title.replace(/[^a-zA-Z0-9-_]/g, '_') : 'downloaded_file';
            if (!filename.endsWith(ext)) filename += ext;
            saveAs(blob, filename);
        } catch (err) {
            alert('Failed to download file.');
        }
    };

    return (
        <>
            <AddResource
                show={showModal}
                onHide={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <div className='userlistcontainer'>
                <div className='userlist1'>
                    <div className='userlist2'>
                        <h6>All Resources</h6>
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
                                    <th>Title</th>
                                    <th>Exam</th>
                                    <th>Sub Exam</th>
                                    <th>Description</th>
                                    <th>Size (MB)</th>
                                    <th>Type</th>
                                    <th>Download</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="10" className="tableloading">
                                            <img src={img} alt="loading" />
                                        </td>
                                    </tr>
                                ) : Data?.resources?.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="tableloading">
                                            <p>No data available.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    Data?.resources?.map((i, index) => (
                                        <tr key={i._id}>
                                            <td>#{index + 1}</td>
                                            <td>{i?.title}</td>
                                            <td>{i?.exam?.name}</td>
                                            <td>{i?.subExam?.name}</td>
                                            <td>{i?.description}</td>
                                            <td>{i?.size} MB</td>
                                            <td>{i?.typeOfFile}</td>
                                            <td>
                                                <button onClick={() => handleDownload(i)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                    <FaDownload />
                                                </button>
                                            </td>
                                            <td className="div-icons">
                                                <FaEdit onClick={() => openEditModal(i)} />
                                                <MdDelete onClick={() => handleDelete(i._id)} />
                                            </td>
                                        </tr>
                                    ))
                                )}
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

export default HOC(AllResources)
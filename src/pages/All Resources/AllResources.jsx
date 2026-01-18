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
        if (!categoryId) return;
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
            
            // Function to get file extension from MIME type
            const getExtensionFromMimeType = (mimeType) => {
                const mimeToExtMap = {
                    'application/pdf': '.pdf',
                    'application/msword': '.doc',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
                    'application/vnd.ms-excel': '.xls',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
                    'application/vnd.ms-powerpoint': '.ppt',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
                    'text/plain': '.txt',
                    'text/csv': '.csv',
                    'image/jpeg': '.jpg',
                    'image/jpg': '.jpg',
                    'image/png': '.png',
                    'image/gif': '.gif',
                    'image/webp': '.webp',
                    'application/zip': '.zip',
                    'application/x-rar-compressed': '.rar',
                    'application/vnd.rar': '.rar',
                    'application/x-zip-compressed': '.zip'
                };
                
                return mimeToExtMap[mimeType.toLowerCase()] || '';
            };

            // Function to get extension from URL
            const getExtensionFromUrl = (url) => {
                try {
                    // Remove query parameters and get the pathname
                    const pathname = new URL(url).pathname;
                    const lastDot = pathname.lastIndexOf('.');
                    if (lastDot > 0 && lastDot < pathname.length - 1) {
                        const ext = pathname.substring(lastDot).toLowerCase();
                        // Validate that it's a reasonable file extension (2-5 characters)
                        if (ext.length >= 2 && ext.length <= 5 && /^\.[\w]+$/.test(ext)) {
                            return ext;
                        }
                    }
                } catch (error) {
                    console.log('Error parsing URL:', error);
                }
                return '';
            };

            // Function to detect file type from file signature (magic numbers)
            const detectFileTypeFromBlob = async (blob) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const arr = new Uint8Array(e.target.result);
                        const header = arr.slice(0, 4);
                        
                        // Convert to hex string
                        const hex = Array.from(header).map(b => b.toString(16).padStart(2, '0')).join('');
                        
                        // File signatures (magic numbers)
                        const signatures = {
                            '25504446': '.pdf',          // PDF
                            'd0cf11e0': '.doc',          // DOC (old format)
                            '504b0304': '.docx',         // DOCX/XLSX/PPTX (ZIP-based)
                            '504b0506': '.docx',         // DOCX/XLSX/PPTX (empty ZIP)
                            '504b0708': '.docx',         // DOCX/XLSX/PPTX (spanned ZIP)
                            'ffd8ffe0': '.jpg',          // JPEG
                            'ffd8ffe1': '.jpg',          // JPEG
                            'ffd8ffe2': '.jpg',          // JPEG
                            '89504e47': '.png',          // PNG
                            '47494638': '.gif',          // GIF
                            '52494646': '.webp'          // WEBP (starts with RIFF)
                        };
                        
                        const fileType = signatures[hex.substring(0, 8)] || signatures[hex.substring(0, 6)] || '';
                        resolve(fileType);
                    };
                    reader.readAsArrayBuffer(blob.slice(0, 4));
                });
            };

            let ext = '';
            
            // Priority 1: Try to get extension from blob MIME type
            if (blob.type && blob.type !== 'application/octet-stream') {
                ext = getExtensionFromMimeType(blob.type);
                console.log('Extension from blob MIME type:', ext, 'MIME:', blob.type);
            }
            
            // Priority 2: If no extension from MIME, try URL
            if (!ext) {
                ext = getExtensionFromUrl(resource.url);
                console.log('Extension from URL:', ext);
            }
            
            // Priority 3: If still no extension, try file signature detection
            if (!ext) {
                ext = await detectFileTypeFromBlob(blob);
                console.log('Extension from file signature:', ext);
            }
            
            // Priority 4: Get from Content-Type header if available
            if (!ext && response.headers.get('content-type')) {
                const contentType = response.headers.get('content-type');
                ext = getExtensionFromMimeType(contentType);
                console.log('Extension from Content-Type header:', ext, 'Content-Type:', contentType);
            }

            let filename = resource.title ? resource.title.replace(/[^a-zA-Z0-9-_\s]/g, '_') : 'downloaded_file';
            
            if (ext && !filename.toLowerCase().endsWith(ext.toLowerCase())) {
                filename += ext;
            } else if (!ext) {
                // If we still can't determine the type, use a generic extension
                filename += '.file';
            }
            
            console.log('Final filename:', filename);
            saveAs(blob, filename);
        } catch (err) {
            alert('Failed to download file.');
            console.error('Download error:', err);
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
                                            <td>#{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                            <td>{i?.title}</td>
                                            <td>{i?.exam?.name}</td>
                                            <td>{i?.subExam?.name}</td>
                                            <td>{i?.description}</td>
                                            <td>{i?.size} MB</td>
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
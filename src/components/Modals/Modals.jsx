import Modal from "react-bootstrap/Modal";
import './Modals.css'
import { toast } from 'react-toastify';
import { FiUpload } from "react-icons/fi";


import { IoMdClose } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import { postApi, putApi, getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';



import img1 from '../../assest/user.webp'
import Calendar from "react-calendar";






const CalendarView = (props) => {
    const { onHide, onSelectDate, dateRange } = props;


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body style={{ background: "#FF5534", borderRadius: "5px" }}>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header" style={{ borderBottom: "1px solid white", marginBottom: "10px", paddingBottom: "1rem" }}>
                        <h6 style={{ color: "#FFF" }}>Select  Date</h6>
                        <IoMdClose color="white" size={25} onClick={onHide} />
                    </div>
                    <div className='description-content'>
                        <div className="Calendar-custome">
                            <Calendar
                                selectRange
                                onChange={onSelectDate}
                                value={dateRange}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const AdminDetailsModal = (props) => {
    const navigate = useNavigate()
    const { data, onHide } = props;
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{data?.user?.fullName} details</h6>
                        <IoMdClose size={25} onClick={onHide} />
                    </div>
                    <div className="referralusermodal-main">
                        <div className="subadmindetails-image-img">
                            <div className="referralusermodal-image">
                                <img src={data?.user?.image || img1} alt="" />
                            </div>
                            <div className="subadmindetails-image-content">
                                <h6>Permissions</h6>
                                {data?.user?.permission && data.user.permission.length > 0 ? (
                                    <ul>
                                        {data.user.permission.map((i, index) => (
                                            <li key={index}>{i}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No data available.</p>
                                )}
                            </div>

                        </div>
                        <div className="referralusermodal-content">
                            <div className="referralusermodal-content-div ">
                                <h6>Name</h6>
                                <span>:</span>
                                <p>{data?.user?.fullName}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Sub admin ID</h6>
                                <span>:</span>
                                <p>#{data?.user?.userId}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Registered Date</h6>
                                <span>:</span>
                                <p>{data?.memberSince}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Added By</h6>
                                <span>:</span>
                                <p>{data?.user?.fullName}</p>
                            </div>
                            <div className="referralusermodal-content-div">
                                <h6>Status </h6>
                                <span>:</span>
                                <p>{data?.user?.status}</p>
                            </div>
                        </div>
                        <div className="referralusermodal-btns">
                            <button onClick={onHide} className="cancel1">Cancel</button>
                            <button onClick={() => navigate(`/subadmin/view/${data?.user?._id}`)} className="done1">View full details</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}


const AddExams = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [name, setName] = useState(data?.name || '');
    const [description, setDescription] = useState(data?.description || '');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);




    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];


    useEffect(() => {
        if (edit && data) {
            setName(data?.name || "");
            setDescription(data?.description || null);
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setName("");
        setDescription(null);
        setImage(null);
        setImagePreview("");
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleSubmit = async () => {
        if (!name || !description || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);

        await postApi(endPoints.addExam, formData, {
            setLoading,
            successMsg: "Exam added successfully!",
            errorMsg: "Failed to add exam!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateExam(id), formData, {
            setLoading,
            successMsg: "Exam updated successfully!",
            errorMsg: "Failed to update exam!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Exam " : "Add Exam"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter the exam name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Description</label>
                            <textarea
                                placeholder="Enter the exam description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Image</label>
                            <div className='addservice-right-image'>
                                {imagePreview
                                    ?
                                    <>
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FiUpload color='#979797' size={25} />
                                        <p>Upload CSV File or image</p>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddSubExams = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [name, setName] = useState(data?.name || '');
    const [description, setDescription] = useState(data?.description || '');
    const [examid, setExamId] = useState(data?.exam || '');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [examsOptions, setExamsOptions] = useState([]);

    const [pagination, setPagination] = useState({
        limit: 50,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });


    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];



    const fetchExams = useCallback(async () => {
        setExamsOptions([])
        await getApi(endPoints.getAllExams(pagination.page, pagination.limit), {
            setResponse: setExamsOptions,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit])

    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    useEffect(() => {
        if (edit && data) {
            setName(data?.name || "");
            setDescription(data?.description || null);
            setExamId(data?.exam || null);
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setName("");
        setDescription(null);
        setExamId('');
        setImage(null);
        setImagePreview("");
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleSubmit = async () => {
        if (!name || !description || !examid || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("examId", examid);
        formData.append("image", image);

        await postApi(endPoints.addsubExam, formData, {
            setLoading,
            successMsg: "SubExam added successfully!",
            errorMsg: "Failed to add subExam!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("examId", examid);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updatesubExam(id), formData, {
            setLoading,
            successMsg: "Exam updated successfully!",
            errorMsg: "Failed to update exam!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit SubExam " : "Add SubExam"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter the sub exam name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Description</label>
                            <textarea
                                placeholder="Enter the sub exam description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Select Exam</label>
                            <select
                                name="exams"
                                value={examid}
                                onChange={(e) => setExamId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading ?
                                    <option value="">Loading...</option>
                                    :
                                    !Array.isArray(examsOptions?.exams) || examsOptions?.exams?.length === 0 ? (
                                        <option value="">No data</option>
                                    ) : (
                                        examsOptions?.exams?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        )))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Image</label>
                            <div className='addservice-right-image'>
                                {imagePreview
                                    ?
                                    <>
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FiUpload color='#979797' size={25} />
                                        <p>Upload CSV File or image</p>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
const AddTestSeries = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [name, setName] = useState(data?.name || '');
    const [subexamid, setSubExamId] = useState(data?.subExam?._id || '');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [subexamsOptions, setSubExamsOptions] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 50,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });


    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];



    const fetchSubExams = useCallback(async () => {
        setSubExamsOptions([])
        await getApi(endPoints.getAllSubExams(pagination.page, pagination.limit), {
            setResponse: setSubExamsOptions,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit])

    useEffect(() => {
        fetchSubExams();
    }, [fetchSubExams]);

    useEffect(() => {
        if (edit && data) {
            setName(data?.name || "");
            setSubExamId(data?.subExam?._id || null);
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setName("");
        setSubExamId('');
        setImage(null);
        setImagePreview("");
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleSubmit = async () => {
        if (!name || !subexamid || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("subExamId", subexamid);
        formData.append("image", image);

        await postApi(endPoints.addTestSeries, formData, {
            setLoading,
            successMsg: "Test Series added successfully!",
            errorMsg: "Failed to add test series!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("subExamId", subexamid);

        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateTestSeries(id), formData, {
            setLoading,
            successMsg: "Test Series updated successfully!",
            errorMsg: "Failed to update Test Series!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Test Series " : "Add Test Series"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter the exam name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Select SubExam</label>
                            <select
                                name="exams"
                                value={subexamid}
                                onChange={(e) => setSubExamId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading ?
                                    <option value="">Loading...</option>
                                    :
                                    !Array.isArray(subexamsOptions?.subExams) || subexamsOptions?.subExams?.length === 0 ? (
                                        <option value="">No data</option>
                                    ) : (
                                        subexamsOptions?.subExams?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        )))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Image</label>
                            <div className='addservice-right-image'>
                                {imagePreview
                                    ?
                                    <>
                                        <div className="image-preview-container">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <FiUpload color='#979797' size={25} />
                                        <p>Upload CSV File or image</p>
                                        <div className='addserivce-btn'>
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddMockTests = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [name, setName] = useState(data?.name || '');
    const [testSeriesId, setTestSeriesId] = useState(data?.testSeries?._id || '');
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const [testSeriesOptions, setTestSeriesOptions] = useState([]);

    const [pagination, setPagination] = useState({
        limit: 50,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });


    const fetchTestSeriesData = useCallback(async () => {
        setTestSeriesOptions([])
        await getApi(endPoints.getAllTestSeries(pagination.page, pagination.limit), {
            setResponse: setTestSeriesOptions,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit])

    useEffect(() => {
        fetchTestSeriesData();
    }, [fetchTestSeriesData]);

    useEffect(() => {
        if (edit && data) {
            setName(data?.name || "");
            setTestSeriesId(data?.testSeries?._id || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setName("");
        setTestSeriesId('');
    };


    const handleSubmit = async () => {
        if (!name || !testSeriesId) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            name: name,
            testSeriesId: testSeriesId
        }

        await postApi(endPoints.addMockTest, payload, {
            setLoading,
            successMsg: "Mock Test added successfully!",
            errorMsg: "Failed to add mock test!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const payload = {
            name: name,
            testSeriesId: testSeriesId
        }
        await putApi(endPoints.updateMockTest(id), payload, {
            setLoading,
            successMsg: "Mock Test updated successfully!",
            errorMsg: "Failed to update mock test!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Mock Test " : "Add Mock Test"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter the exam name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Select Test Series</label>
                            <select
                                name="exams"
                                value={testSeriesId}
                                onChange={(e) => setTestSeriesId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading1 ?
                                    <option value="">Loading...</option>
                                    :
                                    !Array.isArray(testSeriesOptions?.testSeries) || testSeriesOptions?.testSeries?.length === 0 ? (
                                        <option value="">No data</option>
                                    ) : (
                                        testSeriesOptions?.testSeries?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        )))}
                            </select>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const AddTests = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [mocktestId, setMockTestId] = useState(data?.mockTestId || '');
    const [duration, setDuration] = useState(data?.duration || null);
    const [totalMarks, setTotalMarks] = useState(data?.totalMarks || null);
    const [isFree, setIsFree] = useState(data?.isFree || null);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const [mocktestOptions, setMockTestOptions] = useState([]);

    const [pagination, setPagination] = useState({
        limit: 50,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });


    const fetchMockTestData = useCallback(async () => {
        setMockTestOptions([])
        await getApi(endPoints.getAllMockTests(pagination.page, pagination.limit), {
            setResponse: setMockTestOptions,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit])

    useEffect(() => {
        fetchMockTestData();
    }, [fetchMockTestData]);

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setMockTestId(data?.mockTestId || '');
            setDuration(data?.duration || null);
            setTotalMarks(data?.totalMarks || null);
            setIsFree(data?.isFree || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setTitle("");
        setMockTestId(null);
        setDuration(null);
        setTotalMarks(null);
        setIsFree(null);
    };


    const handleSubmit = async () => {
        if (!title || !mocktestId || !duration || !totalMarks || !isFree) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            title: title,
            duration: duration,
            isFree: isFree,
            mockTestId: mocktestId
        }

        await postApi(endPoints.addTest, payload, {
            setLoading,
            successMsg: "Test added successfully!",
            errorMsg: "Failed to add test!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const handleupdate = async () => {
        const payload = {
            title: title,
            duration: duration,
            totalMarks: totalMarks,
            isFree: isFree,
            mockTestId: mocktestId
        }

        await putApi(endPoints.updateTest(id), payload, {
            setLoading,
            successMsg: "Test updated successfully!",
            errorMsg: "Failed to update test!",
        });
        fetchdata();
        onHide();
        resetForm();
    };


    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{props.edit ? "Edit Test " : "Add Test"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Title</label>
                            <input
                                type="text"
                                placeholder="Enter the test title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Duration</label>
                            <input
                                type="number"
                                placeholder="Enter the duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>
                        {edit && <div className="addcategory-container">
                            <label htmlFor="">Total Marks</label>
                            <input
                                type="number"
                                placeholder="Enter the total marks"
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(e.target.value)}
                            />
                        </div>}
                        <div className="addcategory-container">
                            <label htmlFor="">Is Free</label>
                            <select
                                value={isFree}
                                onChange={(e) => setIsFree(e.target.value === "true")}
                            >
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>

                        </div>
                        <div className="addcategory-container">
                            <label htmlFor="">Select Mock Test</label>
                            <select
                                name="exams"
                                value={mocktestId}
                                onChange={(e) => setMockTestId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading1 ?
                                    <option value="">Loading...</option>
                                    :
                                    !Array.isArray(mocktestOptions?.mockTests) || mocktestOptions?.mockTests?.length === 0 ? (
                                        <option value="">No data</option>
                                    ) : (
                                        mocktestOptions?.mockTests?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </option>
                                        )))}
                            </select>
                        </div>
                        <div className="addfund-btns">
                            <div className='userlist5'>
                                <button
                                    onClick={props.edit ? handleupdate : handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}



const ViewDescription = (props) => {
    const { data, onHide } = props;

    const renderOptions = (options) => {
        if (!options || !Array.isArray(options)) return null;

        return options?.map((option, index) => (
            <div
                key={index}
                className={`option-item p-3 mb-2 rounded ${option?.isCorrect
                    ? 'correct-answer bg-success text-white'
                    : 'bg-light'
                    }`}
            >
                {String.fromCharCode(65 + index)}. {option.text}
            </div>
        ));
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header d-flex justify-content-between align-items-center"
                        style={{ borderBottom: "1px solid #dee2e6", marginBottom: "20px", paddingBottom: "1rem" }}>
                        <h5 className="mb-0">Question Details</h5>
                        <IoMdClose size={25} onClick={onHide} style={{ cursor: "pointer" }} />
                    </div>

                    <div className='description-content'>
                        {data ? (
                            <div className="question-container">
                                {/* Question Title */}
                                <div className="question-text mb-4"
                                    dangerouslySetInnerHTML={{ __html: data.title || 'No question provided' }} />

                                {/* Question Image if exists */}
                                {data.image && (
                                    <div className="question-image mb-4">
                                        <img
                                            src={data.image}
                                            alt="Question visual"
                                            style={{ maxWidth: '100%', maxHeight: '300px' }}
                                        />
                                    </div>
                                )}

                                {/* Options */}
                                <div className="options-list mt-2">
                                    <h6>Options:</h6>
                                    {renderOptions(data.options)}
                                </div>

                                {/* Additional Info */}
                                <div className="question-meta mt-4 pt-3 border-top">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Positive Marks:</strong> {data.positiveMarks || '0'}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Negative Marks:</strong> {data.negativeMarks || '0'}</p>
                                        </div>
                                        <div className="col-md-12">
                                            <p><strong>Test:</strong> {data.test?.title || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No question data available</p>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};


const AddQuestion = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;

    const [title, setTitle] = useState(data?.title || '');
    const [positiveMarks, setPositiveMarks] = useState(data?.positiveMarks || '');
    const [negativeMarks, setNegativeMarks] = useState(data?.negativeMarks || '');
    const [options, setOptions] = useState(data?.options || [{ text: '', isCorrect: false }]);
    const [testId, setTestId] = useState(data?.test?._id || '');
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [bulkMode, setBulkMode] = useState(false);
    const [bulkFile, setBulkFile] = useState(null);

    const [testOptions, setTestOptions] = useState([]);


    const [pagination, setPagination] = useState({
        limit: 50,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || '');
            setPositiveMarks(data?.positiveMarks || '');
            setNegativeMarks(data?.negativeMarks || '');
            setTestId(data?.test?._id || '');
            setOptions(data?.options || [{ text: '', isCorrect: false }]);
        } else {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setTitle('');
        setPositiveMarks('');
        setNegativeMarks('');
        setTestId('');
        setOptions([{ text: '', isCorrect: false }]);
    };

    const handleAddOption = () => {
        setOptions([...options, { text: '', isCorrect: false }]);
    };

    const handleOptionChange = (index, field, value) => {
        const updated = [...options];
        updated[index][field] = field === 'isCorrect' ? value === 'true' : value;
        setOptions(updated);
    };

    const handleRemoveOption = (index) => {
        const updated = options.filter((_, i) => i !== index);
        setOptions(updated);
    };

    const handleSubmit = async () => {
        if (!title || positiveMarks === '' || negativeMarks === '') {
            toast.error("Please fill all required fields");
            return;
        }

        const payload = {
            title,
            options,
            positiveMarks: parseFloat(positiveMarks),
            negativeMarks: parseFloat(negativeMarks),
            testId: testId
        };

        const apiCall = edit
            ? putApi(endPoints.updateQuestion(id), payload, {
                setLoading,
                successMsg: "Question updated successfully!",
                errorMsg: "Failed to update question!",
            })
            : postApi(endPoints.addQuestion, payload, {
                setLoading,
                successMsg: "Question added successfully!",
                errorMsg: "Failed to add question!",
            });

        await apiCall;

        fetchdata();
        onHide();
        resetForm();
    };

    const closing = () => {
        resetForm();
        onHide();
    };

    const fetchTests = useCallback(async () => {
        setTestOptions([])
        await getApi(endPoints.getAllTests(pagination.page, pagination.limit), {
            setResponse: setTestOptions,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit])

    useEffect(() => {
        fetchTests();
    }, [fetchTests]);

    return (
        <Modal
            {...props}
            size="sl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="referralusermodal-container">
                    <div className="referralusermodal-header">
                        <h6>{edit ? "Edit Question" : bulkMode ? "Bulk Upload Questions" : "Add Question"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input type="checkbox" checked={bulkMode} onChange={() => setBulkMode(v => !v)} />
                            Bulk Upload
                        </label>
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label htmlFor="">Select Test</label>
                            <select
                                name="exams"
                                value={testId}
                                onChange={(e) => setTestId(e.target.value)}
                            >
                                <option value="">Select</option>
                                {loading1 ?
                                    <option value="">Loading...</option>
                                    :
                                    !Array.isArray(testOptions?.tests) || testOptions?.tests?.length === 0 ? (
                                        <option value="">No data</option>
                                    ) : (
                                        testOptions?.tests?.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.title}
                                            </option>
                                        )))}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label>Positive Marks</label>
                            <input
                                type="number"
                                step="0.1"
                                value={positiveMarks}
                                onChange={(e) => setPositiveMarks(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label>Negative Marks</label>
                            <input
                                type="number"
                                step="0.1"
                                value={negativeMarks}
                                onChange={(e) => setNegativeMarks(e.target.value)}
                            />
                        </div>
                        {bulkMode ? (
                            <div className="addcategory-container">
                                <label>Upload File</label>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls,.csv,.json,.pdf,.doc,.docx"
                                    onChange={e => setBulkFile(e.target.files[0])}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="addcategory-container">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter question title"
                                    />
                                </div>
                                <div className="addcategory-container">
                                    <label>Options</label>
                                    {options.map((opt, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                placeholder={`Option ${index + 1}`}
                                                value={opt.text}
                                                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                            />
                                            <select
                                                value={opt.isCorrect}
                                                onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.value)}
                                            >
                                                <option value="false">Incorrect</option>
                                                <option value="true">Correct</option>
                                            </select>
                                            {options.length > 1 && (
                                                <div className="userlist5">
                                                    <button type="button" onClick={() => handleRemoveOption(index)}>X</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div className="userlist5">
                                        <button type="button" onClick={handleAddOption}>Add Option</button>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="addfund-btns">
                            <div className="userlist5">
                                <button
                                    onClick={async () => {
                                        if (bulkMode) {
                                            if (!bulkFile || !testId || positiveMarks === '' || negativeMarks === '') {
                                                toast.error("Please fill all required fields and select a file");
                                                return;
                                            }
                                            const formData = new FormData();
                                            formData.append('file', bulkFile);
                                            formData.append('testId', testId);
                                            formData.append('positiveMarks', positiveMarks);
                                            formData.append('negativeMarks', negativeMarks);
                                            await postApi(endPoints.addBulkQuestion, formData, {
                                                setLoading,
                                                successMsg: "Questions uploaded successfully!",
                                                errorMsg: "Failed to upload questions!",
                                            });
                                            fetchdata();
                                            onHide();
                                            setBulkFile(null);
                                            setBulkMode(false);
                                        } else {
                                            handleSubmit();
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (bulkMode ? "Uploading..." : (edit ? "Updating..." : "Adding...")) : (bulkMode ? "Upload" : (edit ? "Update" : "Add"))}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};




const AddResource = (props) => {
    const { data, edit, fetchdata, onHide } = props;
    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [description, setDescription] = useState(data?.description || '');
    const [examid, setExamId] = useState(data?.exam?._id || '');
    const [subExamid, setSubExamId] = useState(data?.subExam?._id || '');
    const [resourcePreview, setResourcePreview] = useState(null);
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [examsOption, setExamsOptions] = useState([]);
    const [subexamsOption, setSubExamsOptions] = useState([]);
    const fileInputRef = useRef(null);

    const [pagination, setPagination] = useState({
        limit: 50,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const MAX_FILE_SIZE_MB = 10;
    const VALID_FILE_TYPES = [
        "image/jpeg", "image/png", "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    const fetchExams = useCallback(async () => {
        setExamsOptions([])
        await getApi(endPoints.getAllExams(pagination.page, pagination.limit), {
            setResponse: setExamsOptions,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit])


     const fetchSubExams = useCallback(async () => {
        await getApi(endPoints.getsubexambyexamid(examid), {
            setResponse: setSubExamsOptions,
            setLoading: setLoading2,
            errorMsg: "Failed to fetch data!",
        })
    }, [examid])




    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    useEffect(() => {
        if (examid) fetchSubExams();
    }, [examid, fetchSubExams]);

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setDescription(data?.description || "");
            setExamId(data?.exam?._id || "");
            setSubExamId(data?.subExam?._id || "");
            setResource(null);
            setResourcePreview(data?.url || null);
        } else {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setExamId("");
        setSubExamId("");
        setResource(null);
        setResourcePreview(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type!");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File must be under ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setResource(file);

            if (file.type.startsWith("image/")) {
                setResourcePreview(URL.createObjectURL(file));
            } else {
                setResourcePreview(file.name);
            }
        }
    };

    const handleClearImage = () => {
        setResource(null);
        setResourcePreview(null);
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        if (!title || !description || !resource || !examid || !subExamid) {
            toast.error("Please fill all fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("exam", examid);
        formData.append("subExam", subExamid);
        formData.append("resource", resource);

        await postApi(endPoints.addResource, formData, {
            setLoading,
            successMsg: "Resource added successfully!",
            errorMsg: "Failed to add resource!",
        });

        fetchdata();
        onHide();
        resetForm();
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("exam", examid);
        formData.append("subExam", subExamid);
        formData.append("typeOfFile", 'PDF');
        if (resource) formData.append("resource", resource);

        await putApi(endPoints.updateResource(id), formData, {
            setLoading,
            successMsg: "Resource updated successfully!",
            errorMsg: "Failed to update resource!",
        });

        fetchdata();
        onHide();
        resetForm();
    };

    const closing = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Body>
                <div className='referralusermodal-container'>
                    <div className="referralusermodal-header">
                        <h6>{edit ? "Edit Resource" : "Add Resource"}</h6>
                        <IoMdClose size={25} onClick={closing} />
                    </div>
                    <div className="addfund-main">
                        <div className="addcategory-container">
                            <label>Title</label>
                            <input
                                type="text"
                                placeholder="Enter resource title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label>Select Exam</label>
                            <select value={examid} onChange={(e) => setExamId(e.target.value)}>
                                <option value="">Select</option>
                                {loading1 ? (
                                    <option>Loading...</option>
                                ) : !Array.isArray(examsOption?.exams) ? (
                                    <option>No exams found</option>
                                ) : (
                                    examsOption.exams.map((exam) => (
                                        <option key={exam._id} value={exam._id}>
                                            {exam.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label>Select Sub-Exam</label>
                            <select value={subExamid} onChange={(e) => setSubExamId(e.target.value)}>
                                <option value="">Select</option>
                                {loading2 ? (
                                    <option>Loading...</option>
                                ) : !Array.isArray(subexamsOption?.subExams) ? (
                                    <option>No sub-exams found</option>
                                ) : (
                                    subexamsOption?.subExams.map((sub) => (
                                        <option key={sub._id} value={sub._id}>
                                            {sub.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="addcategory-container">
                            <label>Description</label>
                            <textarea
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="addcategory-container">
                            <label>Upload File (Image, PDF, Doc, etc.)</label>
                            <div className="addservice-right-image">
                                {resourcePreview ? (
                                    <>
                                        {resource && resource.type?.startsWith("image/") ? (
                                            <div className="image-preview-container">
                                                <img src={resourcePreview} alt="Preview" />
                                            </div>
                                        ) : (
                                            <div className="file-preview-name">
                                                <p>{resourcePreview}</p>
                                            </div>
                                        )}
                                        <div className="addserivce-btn">
                                            <button onClick={handleClearImage}>Clear</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <FiUpload size={25} color="#979797" />
                                        <p>Upload file (Image, PDF, DOC, etc.)</p>
                                        <div className="addserivce-btn">
                                            <button onClick={handleUploadClick}>Upload</button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="addfund-btns">
                            <div className="userlist5">
                                <button onClick={edit ? handleUpdate : handleSubmit} disabled={loading}>
                                    {loading ? (edit ? "Updating..." : "Adding...") : (edit ? "Update" : "Add")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};


export {
    AdminDetailsModal,
    AddExams,
    ViewDescription,
    CalendarView,
    AddSubExams,
    AddTestSeries,
    AddMockTests,
    AddTests,
    AddQuestion,
    AddResource
}
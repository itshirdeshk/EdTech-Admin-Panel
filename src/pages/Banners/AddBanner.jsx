import React, { useCallback, useEffect, useRef, useState } from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { getApi, postApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { toast } from 'react-toastify';
import { createPayload } from '../../utils/utils';


const AddBanner = () => {
    const navigate = useNavigate()
    const [redirectId, setRedirectId] = useState('');
    const [redirectmodel, setRedirectModel] = useState('');
    const [subExamId, setSubExamId] = useState('');
    const [bannertype, setBannerType] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);


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

    const [subexamOptions, setSubExamOptions] = useState([]);
    const [testseriesOptions, setTestSeriesOptions] = useState([]);



    const fetchSubExam = useCallback(async () => {
        setSubExamOptions([])
        await getApi(endPoints.getAllSubExams(pagination.page, pagination.limit), {
            setResponse: setSubExamOptions,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch data!",
        })
    }, [pagination.page, pagination.limit])


    const fetchTestseries = async () => {
        await getApi(endPoints.getTestseriesbysubexamid(subExamId), {
            setResponse: setTestSeriesOptions,
            setLoading: setLoading2,
            // errorMsg: "Failed to fetch categories!",
        });
    };


    useEffect(() => {
        fetchSubExam()
    }, [fetchSubExam]);
    useEffect(() => {
        if (subExamId) {
            fetchTestseries()
        }
    }, [subExamId]);



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
    }



    const handleSubmit = async () => {

        const fields = {
            redirectId: redirectId,
            redirectModel: redirectmodel,
            subExamId: subExamId,
            image: image,
            type: bannertype
        };

        const formData = createPayload(fields);

        await postApi(endPoints.addBanner, formData, {
            setLoading,
            successMsg: "Banner added successfully!",
            errorMsg: "Failed to add Banner!",
        });
        navigate("/all-banners");
    };


    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid
                            color='#000000'
                            size={25} onClick={() => navigate(-1)}
                        />
                        <h6>Add Banner</h6>
                    </div>
                    <div className='addserivce-btn'>
                        <button
                            disabled={loading}
                            onClick={handleSubmit} >
                            {loading ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>

                <div className='addservice-container'>
                    <div className='addservice-right'>
                        <div className='addservice-right-div'>
                            <label htmlFor="">Upload Banner</label>
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
                    </div>
                    <div className='addservice-left'>
                        <div className='addsubcategory-left-div'>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Redirect Model</label>
                                <select onChange={(e) => setRedirectModel(e.target.value)}
                                    value={redirectmodel}>
                                    <option value="">Select</option>
                                    <option value="TestSeries">Test Series</option>
                                    <option value="Subscription">Subscription</option>
                                </select>
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Banner Type</label>
                                <select onChange={(e) => setBannerType(e.target.value)}
                                    value={bannertype}>
                                    <option value="">Select</option>
                                    <option value="test-series">Test Series</option>
                                    <option value="subscription">Subscription</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Sub Exam</label>
                                <select
                                    name="exams"
                                    value={subExamId}
                                    onChange={(e) => setSubExamId(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {loading1 ?
                                        <option value="">Loading...</option>
                                        :
                                        !Array.isArray(subexamOptions?.subExams) || subexamOptions?.subExams?.length === 0 ? (
                                            <option value="">No data</option>
                                        ) : (
                                            subexamOptions?.subExams?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            )))}
                                </select>
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Test Series Redirect</label>
                                <select
                                    name="testseries"
                                    value={redirectId}
                                    onChange={(e) => setRedirectId(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {loading2 ?
                                        <option value="">Loading...</option>
                                        :
                                        testseriesOptions?.TestSeries?.length === 0 ?
                                            <option value="">No data</option>
                                            :
                                            testseriesOptions?.TestSeries?.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='addbanner-container'>

                </div>
            </div>
        </>
    )
}

export default HOC(AddBanner)
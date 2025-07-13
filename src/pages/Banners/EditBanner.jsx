import React from 'react'
import HOC from '../../components/HOC/HOC'


import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';
import { FiUpload } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";


const EditBanner = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='userprofilecontainer'>
                <div className='partnerprofile-container'>
                    <div className='userprofile-header'>
                        <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate(-1)} />
                        <h6>Edit Banner</h6>
                    </div>
                    <div className='addserivce-btn'>
                        <button onClick={() => navigate('/banners')}>Update</button>
                    </div>
                </div>

                <div className='addservice-container'>
                    <div className='addservice-right'>
                        <div className='addservice-right-div'>
                            <label htmlFor="">Upload Banner</label>
                            <div className='addservice-right-image'>
                                <FiUpload color='#979797' size={25} />
                                <p>Upload Image</p>
                                <div className='addserivce-btn'>
                                    <button>Upload</button>
                                </div>
                            </div>
                        </div>
                        <div className='editservice-container'>
                            <div className='editservice-left'>
                                <CiImageOn />
                                <div className='editservice-left-content'>
                                    <h6>Image.pmgl</h6>
                                    <p>200 KB</p>
                                </div>
                            </div>
                            <div className='editservice-delete'>
                                <RiDeleteBin6Line />
                            </div>
                        </div>
                    </div>
                    <div className='addservice-left'>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Banner Title</label>
                            <input type="text" placeholder='Enter Title' />
                        </div>
                        <div className='addsubcategory-left-div'>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Link URL</label>
                                <input type="text" placeholder='Enter Benefits' />
                            </div>
                            <div className='addservice-left-div'>
                                <label htmlFor="">Banner Placement</label>
                                <select name="" id="">
                                    <option value="">Choose</option>
                                    <option value="">Home</option>
                                    <option value="">Waxing </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='addbanner-container'>
                    <div className='addsubcategory-left-div'>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Start Date </label>
                            <input type="date" placeholder='Enter Benefits' />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">Start Time</label>
                            <input type="time" placeholder='Enter Benefits' />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">End Date </label>
                            <input type="date" placeholder='Enter Benefits' />
                        </div>
                        <div className='addservice-left-div'>
                            <label htmlFor="">End Time</label>
                            <input type="time" placeholder='Enter Benefits' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(EditBanner)
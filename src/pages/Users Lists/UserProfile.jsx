import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';

import { LiaArrowLeftSolid } from "react-icons/lia";


import img from '../../assest/loading1.gif'
import HOC from '../../components/HOC/HOC';
import Pagination from '../../components/Pagination/Pagination';
import { formatDate } from '../../utils/utils';


const UserProfile = ({ active }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [scoresData, setScoresData] = useState({ scores: [], pagination: {} });
    const [scoresLoading, setScoresLoading] = useState(false);
    const [scoresPagination, setScoresPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalDocs: 0,
    });

    const fetchData = useCallback(async () => {
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [id]);

    const fetchScores = useCallback(async () => {
        setScoresLoading(true);
        await getApi(
            endPoints.getallScores(scoresPagination.page, scoresPagination.limit, '', id),
            {
                setResponse: setScoresData,
                setLoading: setScoresLoading,
                errorMsg: 'Failed to fetch scores!',
            }
        );
        setScoresLoading(false);
    }, [id, scoresPagination.page, scoresPagination.limit]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    useEffect(() => {
        setScoresPagination((prev) => ({
            ...prev,
            totalPages: scoresData?.pagination?.totalPages || 1,
            totalDocs: scoresData?.pagination?.totalDocs || 0,
        }));
    }, [scoresData]);

    const handleScoresPageChange = (page) => {
        setScoresPagination((prev) => ({ ...prev, page }));
    };

    return (
        <>

            <div className='userprofilecontainer'>
                <div className='userprofile-header'>
                    <LiaArrowLeftSolid color='#000000' size={25} onClick={() => navigate('/userslists')} />
                    <h6>User Profile</h6>
                </div>
                {loading ? (
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                ) : !userData?.data ? (
                    <div className='normalloading'>
                        <p>No data available.</p>
                    </div>
                ) : (
                    <div className='userprofile-main'>
                        <div className='userprofile-profileimage'>
                            <img src={userData?.data?.profilePicture} alt="" />
                        </div>
                        <div className="userprofile-content">
                            {[
                                { label: "User name", value: userData?.data?.name },
                                { label: "Email ID", value: userData?.data?.email },
                                { label: "Phone number", value: userData?.data?.phone },
                                { label: "Exam", value: userData?.data?.exam?.name },
                                { label: "Sub Exam", value: userData?.data?.subExam?.name },
                            ].map((field, index) => (
                                <div className="userprofile-content-inputes" key={index}>
                                    <label>{field.label}</label>
                                    <input type="text" value={field.value} readOnly />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Scores Table */}
            <div className="userprofile-scores-table" style={{ marginTop: 32 }}>
                <h4>Previous Scores</h4>
                <div className='bottomdashboard3'>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Test Name</th>
                                <th>Total Questions</th>
                                <th>Attempted</th>
                                <th>Correct</th>
                                <th>Incorrect</th>
                                <th>Marks Obtained</th>
                                <th>Percentage</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoresLoading ? (
                                <tr>
                                    <td colSpan="9" className='tableloading'>
                                        <img src={img} alt="Loading..." />
                                    </td>
                                </tr>
                            ) : scoresData?.scores?.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className='tableloading'>
                                        <p>No scores available.</p>
                                    </td>
                                </tr>
                            ) : (
                                scoresData.scores.map((score, idx) => (
                                    <tr key={score._id}>
                                        <td>{(scoresPagination.page - 1) * scoresPagination.limit + idx + 1}</td>
                                        <td>{score.test?.title || '-'}</td>
                                        <td>{score.test?.totalQuestions ?? '-'}</td>
                                        <td>{score.totalQuestionsAttempted ?? '-'}</td>
                                        <td>{score.totalCorrect ?? '-'}</td>
                                        <td>{score.totalIncorrect ?? '-'}</td>
                                        <td>{score.totalMarksObtained ?? '-'}</td>
                                        <td>{score.percentage ?? '-'}</td>
                                        <td>{score.createdAt ? formatDate(score.createdAt) : '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={scoresPagination.page}
                    totalPages={scoresPagination.totalPages}
                    totalDocs={scoresPagination.totalDocs}
                    onPageChange={handleScoresPageChange}
                />
            </div>

        </>
    )
}

export default HOC(UserProfile)
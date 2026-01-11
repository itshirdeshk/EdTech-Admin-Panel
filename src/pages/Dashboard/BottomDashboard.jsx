import  { useCallback, useEffect, useState } from 'react'
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import img from '../../assest/loading1.gif'

const BottomDashboard = () => {
    const [leaderboards, setLeaderboards] = useState([]);
    const [selectedTestId, setSelectedTestId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [testOptions, setTestOptions] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 50,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const fetchLeaderboard = async (testId) => {
        await getApi(endPoints.getLeaderboardByTestid(testId), {
            setResponse: setLeaderboards,
            setLoading: setIsLoading,
            errorMsg: "Failed to fetch leaderboards data!",
        });
    };

    useEffect(() => {
        if (selectedTestId) {
            fetchLeaderboard(selectedTestId);
        }
    }, [selectedTestId]);


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
        <>
            <div className='bottomdashboard'>
                <div className='bottomdashboard1'>
                    <h6>Leaderboard Overview</h6>
                    <div className="addcategory-container">
                        <label>Select Test</label>
                        <select
                            name="exams"
                            value={selectedTestId}
                            onChange={(e) => setSelectedTestId(e.target.value)}
                        >
                            <option value="">Select</option>
                            {loading1 ?
                                <option value="">Loading...</option>
                                :
                                !Array.isArray(testOptions?.tests) || testOptions?.test?.length === 0 ? (
                                    <option value="">No data</option>
                                ) : (
                                    testOptions?.tests?.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.title}
                                        </option>
                                    )))}
                        </select>
                    </div>
                </div>
                {!selectedTestId ? (
                    <div className="empty-state">
                        <div className="empty-state-content">
                            <i className="fas fa-clipboard-list"></i>
                            <h3>No Test Selected</h3>
                            <p>Please select a test from the dropdown to view the leaderboard</p>
                        </div>
                    </div>
                ) : isLoading ? (
                    <div className='normalloading'>
                        <img src={img} alt="" />
                    </div>
                ) : (
                    <div className='bottomdashboard3'>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Rank</th>
                                    <th>Candidate</th>
                                    <th>Score</th>
                                    <th>Test ID</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(!leaderboards?.leaderboard || leaderboards?.leaderboard?.length === 0) ? (
                                    <tr>
                                        <td colSpan="10" className='tableloading'>
                                            <p>No data available.</p>
                                        </td>
                                    </tr>
                                ) :
                                    leaderboards?.leaderboard?.map((entry, index) => (
                                        <tr key={index}>
                                            <td>#{index + 1}</td>
                                            <td>{entry?.rank}</td>
                                            <td>{entry.user?.name || "Unknown"}</td>
                                            <td>
                                                {entry.score?.totalMarksObtained >= 0
                                                    ? `${entry.score.totalMarksObtained} / ${entry.score.totalMarks}`
                                                    : "Not Available"}
                                            </td>
                                            <td>{entry.test}</td>
                                            <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default BottomDashboard
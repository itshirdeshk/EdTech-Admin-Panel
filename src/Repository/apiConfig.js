const endPoints = {
    loginAdmin: "admin/login",

    getallUser: (page, limit, search, examfilter, premium, blocked) =>
        `admin/all/user?page=${page}&limit=${limit}&search=${search ? search : ""}&examId=${examfilter ? examfilter : ""}${premium !== undefined ? `&premium=${premium}` : ''}${blocked !== undefined ? `&blocked=${blocked}` : ''}`,
    getAllExams: (page, limit, search) =>
        `admin/all/exams?page=${page}&limit=${limit}&name=${search ? search : ""}`,
    getAllSubExams: (page, limit, search) =>
        `admin/all/subExams?page=${page}&limit=${limit}&name=${search ? search : ""}`,
    getAllTestSeries: (page, limit, search) =>
        `admin/all/testSeries?page=${page}&limit=${limit}&name=${search ? search : ""}`,
    getAllMockTests: (page, limit, search) =>
        `admin/all/mockTest?page=${page}&limit=${limit}&name=${search ? search : ""}`,
    getAllTests: (page, limit, search) =>
        `admin/all/test?page=${page}&limit=${limit}&title=${search ? search : ""}`,
    getallQuestions: (page, limit, search) =>
        `admin/all/question?page=${page}&limit=${limit}&title=${search ? search : ""}`,
    getallResources: (page, limit, search) =>
        `admin/all/resource?page=${page}&limit=${limit}&title=${search ? search : ""}`,
    getallScores: (page, limit, search, userId) =>
        `admin/all/score?page=${page}&limit=${limit}&title=${search ? search : ""}&userId=${userId ? userId : ""}`,

    getallCount: "admin/getDashboard",
    getadminprofile: "admin/me",
    getprivactpolicy: "admin/all/privacy-policy",
    getAboutUs: "admin/all/about-us",
    getterms: "admin/all/terms",
    getallFaq: "admin/all/faq",
    getallBanner: "admin/all/banners",





    addExam: "admin/add/exam",
    addsubExam: "admin/add/subExam",
    addTestSeries: "admin/add/testSeries",
    addMockTest: "admin/add/mockTest",
    addTest: "admin/add/test",
    addPrivacyPolicy: "admin/add/privacy-policy",
    addterms: "admin/add/terms",
    addFaq: "admin/add/faq",
    addBanner: "admin/add/banner",
    addQuestion: "admin/add/question",
    addBulkQuestion: "admin/createBulkQuestions",
    addResource: "admin/add/resource",
    addAboutUs: "admin/add/about-us",


    getuserbyid: (id) =>
        `admin/getUserById/${id}`,
    getprivactpolicybyid: (id) =>
        `admin/getPrivacyPolicyById/${id}`,
    getaboutUsbyid: (id) =>
        `admin/getAboutUsById/${id}`,
    gettermsbyid: (id) =>
        `admin/getTermsById/${id}`,
    getfaqbyid: (id) =>
        `admin/getFAQById/${id}`,
    getTestseriesbysubexamid: (id) =>
        `admin/getTestSeriesBySubExamId/${id}`,
    getbannerbyid: (id) =>
        `admin/getBannerById/${id}`,
    getsubexambyexamid: (id) =>
        `admin/getSubExamsByExamId/${id}`,
    getLeaderboardByTestid: (id) =>
        `admin/getLeaderboardByTestId/${id}`,




    updateExam: (id) =>
        `admin/updateExamById/${id}`,
    updatesubExam: (id) =>
        `admin/updateSubExamById/${id}`,
    updateTestSeries: (id) =>
        `admin/updateTestSeriesById/${id}`,
    updateMockTest: (id) =>
        `admin/updateMockTestById/${id}`,
    updateTest: (id) =>
        `admin/updateTestById/${id}`,
    updatePrivacyPolicy: (id) =>
        `admin/updatePrivacyPolicyById/${id}`,
    updateAboutUs: (id) =>
        `admin/updateAboutUsById/${id}`,
    updateTerms: (id) =>
        `admin/updateTermsById/${id}`,
    updateFAQ: (id) =>
        `admin/updateFAQById/${id}`,
    updateQuestion: (id) =>
        `admin/updateQuestionById/${id}`,
    updateResource: (id) =>
        `admin/updateResourceById/${id}`,

    updateadminprofile: 'admin/updateProfile',





    deleteuser: (id) =>
        `admin/delete/${id}`,
    deleteExam: (id) =>
        `admin/deleteExamById/${id}`,
    deletesubExam: (id) =>
        `admin/deleteSubExamById/${id}`,
    deleteTestSeries: (id) =>
        `admin/deleteTestSeriesById/${id}`,
    deleteMockTests: (id) =>
        `admin/deleteMockTestById/${id}`,
    deleteTests: (id) =>
        `admin/deleteTestById/${id}`,
    deleteprivacypolicy: (id) =>
        `admin/deletePrivacyPolicyById/${id}`,
    deleteAboutUs: (id) =>
        `admin/deleteAboutUsById/${id}`,
    deleteterms: (id) =>
        `admin/deleteTermsById/${id}`,
    deletefaq: (id) =>
        `admin/deleteFAQById/${id}`,
    deletebanner: (id) =>
        `admin/deleteBannerById/${id}`,
    deleteQuestion: (id) =>
        `admin/deleteQuestionById/${id}`,
    deleteResources: (id) =>
        `admin/deleteResourceById/${id}`,



    blockUser: (id) =>
        `admin/blockUser/${id}`,
    unblockUser: (id) =>
        `admin/unblockUser/${id}`,

    makeUserPremium: (id) =>
        `admin/makePremium/${id}`,
    makeUserNormal: (id) =>
        `admin/makeNormal/${id}`,

    sendNotification: "admin/notification/send"
};

export default endPoints;
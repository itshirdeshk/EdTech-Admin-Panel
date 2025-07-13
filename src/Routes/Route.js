/** @format */
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Login from "../pages/Login/Login.jsx";
import UsersLists from "../pages/Users Lists/UsersLists.jsx";
import AllExams from "../pages/All Exams/AllExams.jsx";
import AllSubExams from "../pages/All Sub Exams/AllSubExams.jsx";
import TestSeries from "../pages/All Test Series/TestSeries.jsx";
import MockTests from "../pages/Mock Tests/MockTests.jsx";
import AdminProfile from "../pages/Admin Profile/AdminProfile.jsx";
import Tests from "../pages/Alll Tests/Tests.jsx";
import UserProfile from "../pages/Users Lists/UserProfile.jsx";
import Privacypolicy from "../pages/Policy Setting/Privacypolicy.jsx";
import Editprivacypolicy from "../pages/Policy Setting/Editprivacypolicy.jsx";
import Createnewpolicy from "../pages/Policy Setting/Createnewpolicy.jsx";
import TermsandConditions from "../pages/Policy Setting/TermsandConditions.jsx";
import Createnewterms from "../pages/Policy Setting/Createnewterms.jsx";
import EditTerms from "../pages/Policy Setting/EditTerms.jsx";
import FAQ from "../pages/Help & Support/FAQ.jsx";
import CreatenewFAQ from "../pages/Help & Support/CreatenewFAQ.jsx";
import EditFAQ from "../pages/Help & Support/EditFAQ.jsx";
import Banners from "../pages/Banners/Banners.jsx";
import AddBanner from "../pages/Banners/AddBanner.jsx";
import ViewBanner from "../pages/Banners/ViewBanner.jsx";
import Allquestions from "../pages/AllQuestions/Allquestions.jsx";
import AllResources from "../pages/All Resources/AllResources.jsx";
import AboutUs from "../pages/Policy Setting/AboutUs.jsx";
import EditAboutUs from "../pages/Policy Setting/EditAboutUs.jsx";
import CreatenewAboutUs from "../pages/Policy Setting/CreatenewAboutUs.jsx";
import PushNotification from "../pages/Push Notification/PushNotification.jsx";



const allRoutes = [
  {
    route: "/",
    component: <Login />,
    isProtected: false,
  },
  {
    route: "/admin-profile",
    component: <AdminProfile />,
    isProtected: true,
  },
  {
    route: "/dashboard",
    component: <Dashboard />,
    isProtected: true,
  },
  {
    route: "/userslists",
    component: <UsersLists />,
    isProtected: true,
  },
  {
    route: "/push-notification",
    component: <PushNotification />,
    isProtected: true,
  },
  {
    route: "/user-profile/:id",
    component: <UserProfile />,
    isProtected: true,
  },
  {
    route: "/allexams",
    component: <AllExams />,
    isProtected: true,
  },
  {
    route: "/allsubexams",
    component: <AllSubExams />,
    isProtected: true,
  },
  {
    route: "/alltestseries",
    component: <TestSeries />,
    isProtected: true,
  },
  {
    route: "/allmocktests",
    component: <MockTests />,
    isProtected: true,
  },
  {
    route: "/alltests",
    component: <Tests />,
    isProtected: true,
  },
  {
    route: "/privacy-policy",
    component: <Privacypolicy />,
    isProtected: true,
  },
  {
    route: "/privacy-policy/edit/:id",
    component: <Editprivacypolicy />,
    isProtected: true,
  },
  {
    route: "/privacy-policy/add-privacy-policy",
    component: <Createnewpolicy />,
    isProtected: true,
  },
  {
    route: "/terms-and-conditions",
    component: <TermsandConditions />,
    isProtected: true,
  },
  {
    route: "/terms-and-conditions/add",
    component: <Createnewterms />,
    isProtected: true,
  },
  {
    route: "/terms-and-conditions/edit/:id",
    component: <EditTerms />,
    isProtected: true,
  },
  {
    route: "/support-faqs",
    component: <FAQ />,
    isProtected: true,
  },
  {
    route: "/support-faqs/add",
    component: <CreatenewFAQ />,
    isProtected: true,
  },
  {
    route: "/support-faqs/edit/:id",
    component: <EditFAQ />,
    isProtected: true,
  },
  {
    route: "/all-banners",
    component: <Banners />,
    isProtected: true,
  },
  {
    route: "/all-banners/add-banner",
    component: <AddBanner />,
    isProtected: true,
  },
  {
    route: "/all-banners/view-banner/:id",
    component: <ViewBanner />,
    isProtected: true,
  },
  {
    route: "/all-questions",
    component: <Allquestions />,
    isProtected: true,
  },
  {
    route: "/all-resources",
    component: <AllResources />,
    isProtected: true,
  },
  {
    route: "/about-us",
    component: <AboutUs />,
    isProtected: true,
  },
  {
    route: "/about-us/edit/:id",
    component: <EditAboutUs />,
    isProtected: true,
  },
  {
    route: "/about-us/add",
    component: <CreatenewAboutUs />,
    isProtected: true,
  },
];

export default allRoutes;
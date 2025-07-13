import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminProfile, setAdminProfile] = useState(() => {
        // Load from localStorage initially
        const savedProfile = localStorage.getItem("adminProfile");
        return savedProfile ? JSON.parse(savedProfile) : null;
    });

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refreshAdminData = () => {
        setRefresh((prev) => !prev);
    };

    const fetchAdminData = useCallback(async () => {
        await getApi(endPoints.getadminprofile, {
            setResponse: (data) => {
                setAdminProfile(data);
                localStorage.setItem("adminProfile", JSON.stringify(data));  
            },
            setLoading: setLoading,
            errorMsg: "Failed to fetch admin data!",
        });
    }, []);

    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData, refresh]);

    return (
        <AdminContext.Provider value={{ adminProfile, loading, refreshAdminData }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);

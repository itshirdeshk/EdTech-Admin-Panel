export const BaseUrl = "https://testify-server-production-704a.up.railway.app/api/";

export const getAuthHeaders = () => {
    const token = sessionStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
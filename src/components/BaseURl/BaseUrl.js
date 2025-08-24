export const BaseUrl = "https://testify-server-production.up.railway.app/api/";
// export const BaseUrl = "https://testify-server-tau.vercel.app/api/";

export const getAuthHeaders = () => {
    const token = sessionStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
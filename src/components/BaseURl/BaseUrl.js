export const BaseUrl = "https://testify-server-production-98a5.up.railway.app/api/";
// export const BaseUrl = "https://testify-server-tau.vercel.app/api/";
// export const BaseUrl = "http://localhost:8080/api/";

export const getAuthHeaders = () => {
    const token = sessionStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
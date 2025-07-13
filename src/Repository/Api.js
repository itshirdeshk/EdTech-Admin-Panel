/** @format */

import axios from "axios";
import { BaseUrl, getAuthHeaders } from '../components/BaseURl/BaseUrl'
import { toast } from 'react-toastify';

const handleError = (error, customErrorMsg) => {
    const msg = error?.response?.data?.message || customErrorMsg;

    if (msg.toLowerCase().includes("wrong password") || msg.toLowerCase().includes("invalid")) {
        toast.error("Invalid credentials");
    } else {
        toast.error(msg);
    }
};


const apiRequest = async (method, url, payload = null, options = {}) => {
    const {
        setResponse,
        setLoading,
        additionalFunctions = [],
        successMsg,
        errorMsg,
    } = options;
    if (setLoading) setLoading(true);

    try {
        let response;
        if (method === "get" || method === "delete") {
            response = await axios[method](`${BaseUrl}${url}`, getAuthHeaders());
        } else {
            response = await axios[method](`${BaseUrl}${url}`, payload, getAuthHeaders());
        }

        if (setResponse) setResponse(response.data);

        // Display success message
        if (successMsg) toast.success(successMsg);

        // Run additional functions
        additionalFunctions.forEach(
            (func) => func && typeof func === "function" && func(response?.data)
        );
    } catch (error) {
        handleError(error, errorMsg);
        console.log(error)
    } finally {
        if (setLoading) setLoading(false);
    }
};




export const getApi = (url, options) => apiRequest("get", url, null, options);
export const postApi = (url, payload, options) =>
    apiRequest("post", url, payload, options);
export const putApi = (url, payload, options) =>
    apiRequest("put", url, payload, options);
export const deleteApi = (url, options) =>
    apiRequest("delete", url, null, options);
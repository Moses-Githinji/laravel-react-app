import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    // Executes if the request is resolved successfully
    (response) => {
        return response;
    },
    // Executes if the request isn't resolved successfully, or an error occurs during resolution
    (error) => {
        const { response } = error;

        // Perform various checks and executions based on the response obtained
        if (response.status === 401) {
            // If the user is not authorized, then do something
            localStorage.removeItem("ACCESS_TOKEN");
        } else if (response.status === 404) {
            console.log("Resource Was Not Found!" + response.status);
        }
        throw error;
    }
);

export default axiosClient;

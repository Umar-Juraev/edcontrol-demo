import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const requestInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

requestInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')

    config.headers = {
        Authorization: `Token ${token}`
    }

    return config;
});

requestInstance.interceptors.response.use(
    (config: AxiosResponse) => config,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            window.location.replace(`${process.env.REACT_APP_BASE_URL}`)
        }

        throw error
    }
);

export default requestInstance;

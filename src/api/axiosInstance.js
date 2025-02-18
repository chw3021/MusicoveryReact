import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // Spring Boot 서버의 기본 URL
});

export default axiosInstance;
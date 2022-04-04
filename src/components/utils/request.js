import axios from "axios";
import config from "../config/config";
const token = localStorage.getItem('token')
const AxiosInstance = axios.create({
    baseURL: config.backURL,
    headers: { Authorization: `Bearer ${token}` }
});

export default AxiosInstance

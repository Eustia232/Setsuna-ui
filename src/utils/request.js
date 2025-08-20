import axios from "axios";
import {ElMessage} from "element-plus";
import {getToken} from "@/utils/token.js";
import router from "@/router/index.js";

const service = axios.create( {
    "baseURL": import.meta.env.VITE_BASE_API,
    timeout: 10000,
} );
service.interceptors.request.use( res => {
    if (getToken()) {
        res.headers["Authorization"] = "Bearer " + getToken();
    }
    return res;
} );
service.interceptors.response.use( res => {
    if (res && res.data) {
        if (res.data.message) {
            ElMessage.success( res.data.message );
        }
        if (res.data.data) {
            return res.data.data;
        }
        return null;
    }
}, err => {
    if (err.status === 500) {
        ElMessage.error( "服务器未响应" );
    }
    else if (err.status >= 400 && err.status < 500) {
        if (err.response && err.response.data) {
            ElMessage.error( err.response.data.message );
        }
        else {
            ElMessage.error( err.message );
        }
        if (err.status === 401) {
            router.push( {
                name: "Index",
            } );
        }
    }
    return Promise.reject();
} );
export default service;
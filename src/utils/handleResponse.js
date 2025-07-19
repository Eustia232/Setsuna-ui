import {ElMessage} from "element-plus";

/**
 * @param {Promise} response
 * @return {Promise}
 */
export default function handleResponse( response ) {
    return response.then( res => {
        if (res && res.data) {
            if (res.data.message) {
                ElMessage.success( res.data.message );
            }
            if (res.data.data) {
                return res.data.data;
            }
            return null;
        }
    } ).catch( error => {
        if (error.status === 500) {
            ElMessage.error( "服务器未响应" );
        }
        else if (error.status >= 400 && error.status < 500) {
            console.error( error );
            if (error.response && error.response.data) {
                ElMessage.error( error.response.data.message );
            }
            else {
                ElMessage.error( error.message );
            }
        }
        throw error;
    } );
}
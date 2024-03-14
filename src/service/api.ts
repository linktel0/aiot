import axios from "axios";

//export const URL = 'https://2f28-2804-431-cfcc-c49c-a431-bee-1290-a5dc.ngrok-free.app'
//export const URL = 'https://a6b9-2804-431-cfcc-1a95-a161-4875-63fd-59e9.ngrok-free.app/'
export const URL = '192.168.1.4:3001'
export const client = axios.create({
    baseURL:URL,
    //headers: {'Cache-Control': 'no-cache',} //resolve: error:304
    //Content-Type: application/json
});


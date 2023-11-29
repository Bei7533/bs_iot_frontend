import axios from 'axios'
import baseUrl from '../api/baseUrl'

const service = axios.create({
    baseURL: "http://localhost:8088/", // 这里本来是baseUrl
    timeout: 15000,
})

export default service

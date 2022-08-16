import axios, { AxiosInstance } from 'axios'
// const baseURL = "http://127.0.0.1:8000"
const baseURL = "https://chyu123.top:8000"
// const baseURL = "http://127.0.0.1:4523/mock/1446768"
interface MyAxiosInstance extends AxiosInstance {
    baseURL?: string
}
const http: MyAxiosInstance = axios.create({
    baseURL
})
http.baseURL = baseURL
export default http
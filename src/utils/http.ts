import axios, { AxiosInstance } from 'axios'
// const baseURL = "http://127.0.0.1:8001"
// const baseURL = "https://heliopolis.top:8000"
const baseURL = "https://api.heliopolis.top:8001"
// const baseURL = "http://127.0.0.1:4523/mock/1446768"
interface MyAxiosInstance extends AxiosInstance {
    baseURL?: string
}
const http: MyAxiosInstance = axios.create({
    baseURL
})
http.baseURL = baseURL
export default http
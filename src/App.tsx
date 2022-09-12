import {
    BrowserRouter as Router,
} from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import './assets/css/index.css'
import './assets/css/markdown.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useCallback, useContext } from 'react'
import ToTop from './components/ToTop'
import AppRouter from './Router/index'
import http from './utils/http'
import AppContextProvider from './contexts/AppContext'

const useCheckin = ()=>{
    useEffect(()=>{
        const token = localStorage.getItem("token")
        http.post('/v1/api/visitor/record', {
            token
        })
        .then(e=>{
            if(e.data && e.data.code === 1){
                localStorage.setItem("token", e.data.data.token)
            }else{
                return Promise.reject("register failed")
            }
        })
        .catch(e=>{
            console.log(e)
        })
    }, [])
}

const App = () => {
    useCheckin()
	return <div className='font-serif'>
        <AppContextProvider>
            <Router basename='/blog'>
                <Header />
                <AppRouter />
                <Footer />
                <ToTop />
            </Router>
        </AppContextProvider>
    </div>
}
export default App


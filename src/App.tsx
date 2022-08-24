// import React from "react"
import ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    matchRoutes,
    Outlet
} from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import './assets/css/index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import React, { useEffect, useCallback } from 'react'
import ToTop from './components/ToTop'
import Loading from './components/Loading'
import AppRouter from './Router/index'
import http from './utils/http'

const App = () => {
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
	return <>
        <React.Suspense fallback={<Loading />}>
            <Router basename='/blog'>
            {/* <Router basename='/'> */}
                <Header />
                <AppRouter />
                <Footer />
                <ToTop />
            </Router>
        </React.Suspense>
    </>
}
export default App


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
const Home = React.lazy(()=>import('./pages/Home'))
const Talk = React.lazy(()=>import('./pages/Talk'))
const Article = React.lazy(()=>import('./pages/Article'))
const Author = React.lazy(()=>import('./pages/Author'))
const NotFound = React.lazy(()=>import('./pages/NotFound'))
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
	return <div className='bg-gray-100'>
        <React.Suspense fallback={<div>loading...</div>}>
            <Router basename='/blog'>
            {/* <Router basename='/'> */}
                <Header />
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route path='/' element={<Home />}></Route>
                        <Route path="/article/:titleid" element={<Article />}></Route>
                        <Route path="/talk" element={<Talk />}></Route>
                        <Route path='/author/:entry' element={<Author />}></Route>
                        <Route path='*' element={<NotFound />}></Route>
                    </Route>
                </Routes>
                <Footer />
                <ToTop />
            </Router>
        </React.Suspense>
    </div>
}
ReactDom.render(<App></App>, document.getElementById('app'))


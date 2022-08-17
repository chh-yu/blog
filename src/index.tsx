// import React from "react"
import ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    matchRoutes
} from 'react-router-dom'
import Home from './pages/Home'
import Article from './pages/Article'
import 'tailwindcss/tailwind.css'
import 'bytemd/dist/index.min.css'
import './assets/css/github-markdown.css'
import './assets/css/index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect, useCallback } from 'react'
import ToTop from './components/ToTop'
import Talk from './pages/Talk'
import Author from './pages/Author'
import NotFound from './pages/NotFound'
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
        <Router basename='/blog'>
        {/* <Router basename='/'> */}
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/article/:titleid" element={<Article />}></Route>
                <Route path="/talk" element={<Talk />}></Route>
                <Route path='/author/:entry' element={<Author />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
            </Routes>
            <Footer />
            <ToTop />
        </Router>
    </div>
}
ReactDom.render(<App></App>, document.getElementById('app'))


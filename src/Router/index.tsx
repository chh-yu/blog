import {
    Route,
    Outlet,
    Routes
} from 'react-router-dom'
import React, { useEffect, useCallback } from 'react'
const Home = React.lazy(()=>import('../pages/Home'))
const Talk = React.lazy(()=>import('../pages/Talk'))
const Article = React.lazy(()=>import('../pages/Article'))
const Author = React.lazy(()=>import('../pages/Author'))
const NotFound = React.lazy(()=>import('../pages/NotFound'))
import { useNavigate } from 'react-router-dom'

const Router = () => {
    const navigate = useNavigate()
    const backToHome = useCallback(()=>{
        navigate('/')
    }, [])
	return <>
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route path='/' element={<Home />}></Route>
                <Route path="/article/:titleid" element={<Article backToHome={backToHome} />}></Route>
                <Route path="/talk" element={<Talk />}></Route>
                <Route path='/author/:entry' element={<Author />}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Route>
        </Routes>
    </>
}
export default Router


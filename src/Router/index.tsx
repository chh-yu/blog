import {
    Route,
    Outlet,
    Routes
} from 'react-router-dom'
import React, { useEffect, useCallback, Suspense } from 'react'
import Loading from '../components/Loading'
const Home = React.lazy(()=>import('../pages/Home'))
const Talk = React.lazy(()=>import('../pages/Talk'))
const Article = React.lazy(()=>import('../pages/Article'))
const Author = React.lazy(()=>import('../pages/Author'))
const Events = React.lazy(()=>import('../pages/Events'))
const NotFound = React.lazy(()=>import('../pages/NotFound'))
import { useNavigate } from 'react-router-dom'
import IndexRouterContextProvider from '../contexts/IndexRouterContext'

const Router = () => {
    const navigate = useNavigate()
    const backToHome = useCallback(()=>{
        navigate('/')
    }, [])
    const indexNavigate = (path: string)=>{
        navigate(path)
    }
	return <>
        <IndexRouterContextProvider indexNavigate={indexNavigate}>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route path='/' element={<Home />}></Route>
                        <Route path="/article/:titleid" element={<Article backToHome={backToHome} />}></Route>
                        <Route path="/talk" element={<Talk />}></Route>
                        <Route path='/author/:entry' element={<Author />}></Route>
                        <Route path='/events' element={<Events />}></Route>
                        <Route path='*' element={<NotFound />}></Route>
                    </Route>
                </Routes>
            </Suspense>
        </IndexRouterContextProvider>
    </>
}
export default Router


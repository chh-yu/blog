import artices from '../articles/index'
import {
    Route,
    Outlet,
    Routes,
} from 'react-router-dom'
import React, { useEffect, useCallback, Suspense } from 'react'
import Loading from '../components/Loading'
const ArticleDetail = React.lazy(()=>import('../pages/ArticleDetail'))
import { useNavigate } from 'react-router-dom'

const ArticleRouter = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(artices)
    }, [])
	return <>
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        {artices.map(i=>(
                            <Route key={i.title+i.timestamp} path={`/${i.title}`} element={<div className='markdown-body'><i.Component /></div>}></Route>
                        ))}
                    </Route>
                </Routes>
            </Suspense>
        </>
    </>
}
export default ArticleRouter


import {
    Route,
    Outlet,
    Routes
} from 'react-router-dom'
import React, { useEffect, useCallback, Suspense, ReactElement } from 'react'
import Loading from '../components/Loading'
const Article = React.lazy(()=>import('../pages/Article'))
const Space = React.lazy(()=>import('../pages/Space'))
const ArticleDetail = React.lazy(()=>import('../pages/ArticleDetail'))
const Author = React.lazy(()=>import('../pages/Author'))
const Personal = React.lazy(()=>import('../pages/Personal'))
const NotFound = React.lazy(()=>import('../pages/NotFound'))
const CodePost = React.lazy(()=>import('../pages/CodePost'))
import CodePostRouter from './CodePostRouter'

import { useNavigate } from 'react-router-dom'
import IndexRouterContextProvider from '../contexts/IndexRouterContext'

const Title = (title: string) => {
    return (WrapComponent: React.FC) => {
        return (props: any) => {
            useEffect(()=>{
                document.title = title
            }, [])
            return <WrapComponent {...props} />
        }
    }
}
const ArticlePage = Title('Seth · 文章')(Article)
const SpacePage = Title('Seth · 空间')(Space)
const AuthorPage = Title('Seth · Author')(Author)
const PersonalPage = Title('Seth ·')(Personal)
const NotFoundPage = Title('Seth · NotFound')(NotFound)
const CodePostPage = Title('Seth · 编程随想')(CodePost)

const Router = () => {
    const navigate = useNavigate()
    const backToArticle = useCallback(()=>{
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
                        <Route path='/' element={<ArticlePage />}></Route>
                        <Route path="/article/:titleid" element={<ArticleDetail backToArticle={backToArticle} />}></Route>
                        <Route path="/codepost" element={<CodePostPage />}></Route>
                        <Route path="/codepost/article/*" element={<CodePostRouter />}></Route>
                        <Route path="/talk" element={<SpacePage />}></Route>
                        <Route path='/author/:entry' element={<AuthorPage />}></Route>
                        <Route path='/events' element={<PersonalPage />}></Route>
                        <Route path='*' element={<NotFoundPage />}></Route>
                    </Route>
                </Routes>
            </Suspense>
        </IndexRouterContextProvider>
    </>
}
export default Router


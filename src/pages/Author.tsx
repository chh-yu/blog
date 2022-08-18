import {useParams} from 'react-router-dom'
import {useEffect, useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import http from '../utils/http'
import {Editor, Viewer} from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import gfm from '@bytemd/plugin-gfm'
import highlightssr from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import { useScrollTotop } from '../utils/utils'
const plugins = [breaks(), gfm(), highlightssr(), frontmatter()]
class Article {
	title: string
	subtitle: string
	timestamp: string | number
	cover: string
	author: string
	content: string
}
const AthorRoad = () => {
	const [params] = useState(useParams())
	const [token, setToken] = useState<string>('')
	const [data, setData] = useState<Article>(new Article())
	const [title, setTitle] = useState("")
	const [subtitle, setSubtitle] = useState("")
	const [cover, setCover] = useState("")
	const [content, setContent] = useState("")
	const [author, setAuthor] = useState("Set")
	const navigate = useNavigate()
	useScrollTotop()
	useEffect(()=>{
		data.title = title
		data.cover = cover
		data.content = content
		data.subtitle = subtitle
		data.author = author
	}, [title, cover, content, subtitle, author])
	useEffect(() => {
		http
			.post('/v1/api/author/auth', {
				entry: params.entry,
			})
			.then((e) => {
				if (e.data.code == 1) {
					setToken(e.data.data.token)
				} else {
					navigate('/notfound')
					return Promise.reject(e)
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}, [params])
	const uploadImage = useCallback(
		async (files: File[]) => {
			let ret: Array<any>
			console.log(files)
			let data = new FormData()
			files.forEach(i=>{
				data.append('file', i)
			})
			await http.post("/common/upload", data, {
				headers: {
					'Content-type': 'multipart/form-data'
				}
			})
			.then(e=>{
				console.log(e)
				if(e.data && e.data.code == 1){
					ret = e.data.data.files
				}else{
					Promise.reject(e)
				}
			})
			.catch(e=>{
				console.log(e)
			})
			ret.forEach(i=>{
				i.url = http.baseURL+"/"+i.url
			})
			return ret
		},
		[token]
	)
	const uploadArticle = useCallback(() => {
		data.timestamp = (new Date().getTime()/1000).toFixed()
		console.log({...data, token: token})
		http.post('/v1/api/author/upload/article', {
			...data,
			token
		})
		.then(e=>{
			console.log(e)
			if(e.data && e.data.code === 1){
				alert("发布成功")
				navigate("/")
			}else{
				navigate("/")
				return Promise.reject(e.data.msg)
			}
		})
		.catch(e=>{
			console.log(e)
		})
	}, [token])
	return (
		<>
			<div
				className="h-96 bg-cover bg-center"
				style={
					{'background-image': `url(https://chyu123.top/img/50.jpg)`} as any
				}
			>
				<div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white"></div>
			</div>
			<input
				onChange={(e)=>{setTitle(e.target.value)}}
				value={title}
				className="px-8 h-14 w-full leading-3.5rem text-2xl text-gray-700"
				placeholder="标题"
			></input>
			<input
				onChange={(e)=>{setSubtitle(e.target.value)}}
				value={subtitle}
				className="px-8 h-10 w-full leading-10 text-xl text-gray-700"
				placeholder="副标题"
			></input>
			<input
				onChange={(e)=>{setCover(e.target.value)}}
				value={cover}
				className="px-8 h-10 w-full leading-10 text-xl text-gray-700"
				placeholder="封面"
			></input>
			<Editor
				plugins={plugins}
				value={content}
				onChange={(v) => {
					setContent(v)
				}}
				uploadImages={uploadImage}
			></Editor>
			{/* <input className='px-8 h-10 w-full leading-10 text-xl text-gray-700' placeholder='作者'></input> */}
			<div className="flex h-14 w-full justify-center my-2">
				<div onClick={uploadArticle} className="cursor-pointer rounded-full h-full w-24 bg-blue-300 text-white text-center leading-3.5rem">
					发布
				</div>
			</div>
		</>
	)
}
export default AthorRoad

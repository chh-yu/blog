import {useCallback, useEffect, useRef, useState} from 'react'
import breaks from '@bytemd/plugin-breaks'
import http from '../utils/http'
import {formatDate} from '../utils/utils'
import {Link, useParams} from 'react-router-dom'
import {useScrollTotop, useVisibleRef} from '../utils/utils'
import {Pagination} from 'antd'
const plugins = [breaks()]
interface IArticleitem {
	id: string | number
	title: string
	subtitle: string
	timestamp: string | number
	cover: string
	[key: string]: any
}

const ArticleItem: React.FC<any> = (props: any) => {
	const [data, setData] = useState<IArticleitem>(props.data)
	const [visible, visibleRef] = useVisibleRef()
	return (
		<div
			className={`h-32 md:h-48 p-5 bg-white mt-6 rounded-2xl hover:shadow-lg flex transition duration-500 ease-in-out ${
				visible ? 'opacity-100' : 'opacity-0 translate-y-6'
			}`}
			ref={visibleRef}
		>
			<div className="cursor-pointer h-full w-24 md:w-60 overflow-hidden flex-shrink-0">
				{data.cover ? (
					<img
						className="transition duration-500 ease-in-out h-full w-full object-cover hover:scale-125"
						src={data.cover}
					/>
				) : (
					''
				)}
			</div>
			<div className="h-full md:w-96 flex-grow md:flex-shrink ml-3 relative">
				<div className="inline-block cursor-pointer font-extrabold text-sm max-h-10 md:text-xl md:overflow-ellipsis overflow-hidden md:whitespace-nowrap">
					<Link to={`/article/${data.id}`}>{data.title}</Link>
				</div>
				<div className="text-xs mt-1 md:text-sm md:m-8">{data.subtitle}</div>
				<div className="text-xs absolute right-0 bottom-0">
					{formatDate(Number(data.timestamp) * 1000)}
				</div>
			</div>
		</div>
	)
}
const Home: React.FC = () => {
	const [data, setData] = useState<IArticleitem[]>([])
	const [params] = useState(useParams())
	const [visible, visibleRef] = useVisibleRef()
	const ref = useRef()
	const [current, setCurrent] = useState(1)
	const [total, setTotal] = useState(0)
	useScrollTotop()
	// useEffect(() => {
	// 	http.get('/v1/api/article/list').then((e) => {
	// 		let data: IArticleitem[] = e.data.data
	// 		setData(data)
	// 	})
	// 	console.log(params)
	// }, [])
	useEffect(()=>{
		window.scrollTo({top: window.innerHeight/2, behavior: 'smooth'})
		http.post("/v1/api/article/list/pagination", {
			current,
			pagesize: 5,
		})
		.then(e=>{
			if(e.data && e.data.code == 1){
				setData(e.data.data.data)
				setTotal(e.data.data.total)
				return
			}
			return Promise.reject("failed")
		})
		.catch(e=>{
			console.log(e)
		})
	}, [current])
	const arrowClick = useCallback(() => {
		if (ref.current) {
			const el: any = ref.current
			const height =
				el.clientHeight - document.getElementById('Header').clientHeight
			window.scrollTo({top: height, behavior: 'smooth'})
			// console.log(document.getElementById("Header").clientHeight)
		}
	}, [ref])

	return (
		<>
			<div className="relative select-none" ref={ref}>
				<img
					className="w-screen h-64 md:h-screen object-cover"
					src={require('../assets/img/34.jpg')}
				/>
				<div
					onClick={arrowClick}
					className="iconfont icon-jiantouxia absolute bottom-8 mx-auto text-white w-9 h-9 right-0 left-0 font text-3xl cursor-pointer animate-pulse"
				></div>
			</div>
			<div className="md:w-192 w-11/12 m-auto">
				{data.map((i) => (
					<ArticleItem data={i} key={i.id}></ArticleItem>
				))}
			</div>
			<div ref={visibleRef} className={`mt-8 flex justify-center  transition duration-500 ease-in-out ${
				visible ? 'opacity-100' : 'opacity-0 translate-y-6'
			}`}>
				<Pagination current={current} hideOnSinglePage={true} total={total} showSizeChanger={false} pageSize={5} onChange={(page)=>{setCurrent(page)}}/>
			</div>
		</>
	)
}
export default Home

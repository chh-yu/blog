import {useCallback, useEffect, useRef, useState} from 'react'
import breaks from '@bytemd/plugin-breaks'
import http from '../utils/http'
import {formatDate} from '../utils/utils'
import {Link, useParams} from 'react-router-dom'
import {useScrollTotop, useVisibleRef} from '../utils/utils'
import {Pagination} from 'antd'
import {useAppContext} from '../contexts/AppContext'
import Poster from '../components/Poster'
const plugins = [breaks()]
export interface IArticleitem {
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

const Article: React.FC = () => {
	const [data, setData] = useState<IArticleitem[]>([])
	const [params] = useState(useParams())
	const [visible, visibleRef] = useVisibleRef()
	const [current, setCurrent] = useState(1)
	const [total, setTotal] = useState(0)
	useScrollTotop()
	useEffect(() => {
		window.scrollTo({top: window.innerHeight / 2, behavior: 'smooth'})
		http
			.post('/v1/api/article/list/pagination', {
				current,
				pagesize: 10,
			})
			.then((e) => {
				if (e.data && e.data.code == 1) {
					setData(e.data.data.data)
					setTotal(e.data.data.total)
					return
				}
				return Promise.reject('failed')
			})
			.catch((e) => {
				console.log(e)
			})
	}, [current])

	return (
		<>
			<Poster picture='https://heliopolis.top/img/34.jpg' />
			<div className="md:w-192 w-11/12 m-auto">
				{data.map((i) => (
					<ArticleItem data={i} key={i.id}></ArticleItem>
				))}
			</div>
			<div
				ref={visibleRef}
				className={`mt-8 flex justify-center  transition duration-500 ease-in-out ${
					visible ? 'opacity-100' : 'opacity-0 translate-y-6'
				}`}
			>
				<Pagination
					current={current}
					hideOnSinglePage={true}
					total={total}
					showSizeChanger={false}
					pageSize={10}
					onChange={(page) => {
						setCurrent(page)
					}}
				/>
			</div>
		</>
	)
}
export default Article

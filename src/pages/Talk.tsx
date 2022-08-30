import {useCallback, useEffect, useRef, useState} from 'react'
import {Viewer} from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import http from '../utils/http'
import {formatDate} from '../utils/utils'
import {useParams} from 'react-router-dom'
import {debounce} from '../utils/utils'
import { useScrollTotop, useVisibleRef } from '../utils/utils'

interface ITalkItem {
	id: number
	content: string
	medias: string
	timestamp: string | number
	author: string
	[key: string]: any
}
const timeDisplay = (timestamp: number, now: number): string => {
	// 时间戳以ms为单位
	let difference = (now - timestamp) / 1000
	let msg = ''
	if (difference < 60) {
		msg = `「${difference.toFixed()}」秒前`
	} else if (difference < 3600) {
		msg = `「${(difference / 60).toFixed()}」分钟前`
	} else if (difference < 86400) {
		msg = `「${(difference / 3600).toFixed()}」小时前`
	} else if (difference < 2592000) {
		msg = `「${(difference / 86400).toFixed()}」天前`
	} else if (difference < 31104000) {
		msg = `「${(difference / 2592000).toFixed()}」月前`
	} else {
		msg = `「${(difference / 31104000).toFixed()}」年前`
	}
	return msg
}
const TalkMedia = (props: any) => {
	if (props.url.match(/^https{0,1}:\/\/.*\.(jpg|png|jpeg|gif|svg|webp)$/)) {
		return <img className="w-full h-full object-cover" src={props.url} />
	} else if (props.url.match(/^https{0,1}:\/\/.*\.mp4$/)) {
		return <video controls className="w-full h-full object-contain" src={props.url} />
	}
}
const TalkItem: React.FC<any> = (props: any) => {
	const [data, setData] = useState<ITalkItem>(props.data)
	const [like, setLike] = useState<boolean>(props.data.like)
	const [likeCount, setLikeCount] = useState<number>(props.data.likecount?props.data.likecount:0)
	const [visible, visibleRef] = useVisibleRef()
	const doLike = debounce((like: boolean, token: string, object_id: number | string)=>{
		http.post('/v1/api/visitor/dolike', {
			like,
			token,
			type: 'talk',
			object_id
		})
	}, 2000)
	const clickLike = ()=>{
		setLike(!like)
		if(!like){
			setLikeCount((v)=>v+1)
		}else{
			setLikeCount((v)=>v-1)
		}
		doLike(!like, localStorage.getItem('token'), data.id)
	}
	return (
		<div  ref={visibleRef} className={`w-full shadow-lg mb-8 overflow-hidden  transition duration-500 ease-in-out ${visible ? "opacity-100":"opacity-0 translate-y-6"}`}>
			<div className="text-sm text-gray-700">
				{timeDisplay(Number(data.timestamp) * 1000, props.now.getTime())}
			</div>
			<div className="text-base md:text-base my-4 ml-4 font-serif">{data.content}</div>
			<div className="flex flex-wrap mb-2">
				{data.medias && data.medias.split('&&').map((i) => (
					<div className="w-1/3 h-36 md:h-64 p-px flex-grow" key={i}>
						<TalkMedia url={i} />
					</div>
				))}
			</div>
			<div className='flex pl-8 my-4 h-6 leading-6'>
				<div onClick={clickLike} className={`leading-5 active:animate-ping cursor-pointer iconfont ${like ? 'icon-zantongfill text-pink-600':'icon-zantong text-black'}`}></div>
				<div className='mx-2 text-sm text-gray-500'>{likeCount ? likeCount : ""}</div>
			</div>
		</div>
	)
}

const Talk: React.FC = (props: object) => {
	const [data, setData] = useState<ITalkItem[]>([])
	const [now, setNow] = useState<Date>(new Date())
	useScrollTotop()
	useEffect(() => {
		http.post('/v1/api/talk', {
			token: localStorage.getItem('token')
		}).then((e) => {
			let data: ITalkItem[] = e.data.data
			data.sort((a, b) => {
				return Number(b.timestamp) - Number(a.timestamp)
			})
			setData(data)
		})
	}, [])
	return (
		<div className="min-h-screen">
			<div
				className="h-96 bg-cover bg-center"
				style={
					{'backgroundImage': `url(https://chyu123.top/img/back.webp)`} as any
				}
			>
				<div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white"></div>
			</div>
			<div className="mt-4 mx-auto md:w-192 px-12 py-6 overflow-hidden">
				{/* <div className='h-44 w-full shadow-md mb-8'><VisitorHeatmap /></div> */}
				{data && data.map((i) => <TalkItem now={now} data={i} key={i.id} />)}
				<div className="mx-auto my-12 w-1/3 border border-solid border-gray-700"></div>
			</div>
		</div>
	)
}
export default Talk

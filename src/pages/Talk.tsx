import {useEffect, useState} from 'react'
import {Viewer} from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import http from '../utils/http'
import {formatDate} from '../utils/utils'
import {useParams} from 'react-router-dom'
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
const TalkItem = (props: any) => {
	const [data, setData] = useState<ITalkItem>(props.data)
    // useEffect(()=>{
    //     console.log(data)
    // }, [data])
	return (
		<div className="w-full shadow-lg mb-8 overflow-hidden">
			<div className="text-sm text-gray-700">
				{timeDisplay(Number(data.timestamp) * 1000, props.now.getTime())}
			</div>
			<div className="text-base md:text-xl my-4 ml-4 font-serif">{data.content}</div>
			<div className="flex flex-wrap mb-2">
				{data && data.medias.split('&&').map((i) => (
					<div className="w-1/3 h-36 md:h-64 p-px flex-grow" key={i}>
						<TalkMedia url={i} />
					</div>
				))}
			</div>
		</div>
	)
}
const Talk: any = (props: object) => {
	const [data, setData] = useState<ITalkItem[]>([])
	const [now, setNow] = useState<Date>(new Date())
	useEffect(() => {
		http.get('/v1/api/talk').then((e) => {
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
					{'background-image': `url(https://chyu123.top/img/back.webp)`} as any
				}
			>
				<div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white"></div>
			</div>
			<div className="mt-4 mx-auto md:w-192 px-12 py-6 overflow-hidden">
				{data && data.map((i) => <TalkItem now={now} data={i} key={i.id} />)}
				<div className="mx-auto my-12 w-1/3 border border-solid border-gray-700"></div>
			</div>
		</div>
	)
}
export default Talk

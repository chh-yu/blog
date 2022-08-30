import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useAppContext} from '../contexts/AppContext'
import http from '../utils/http'
import {IArticleitem} from './Home'

type EventType = 'Blog Post' | 'Talk'
type Time = string | number | Date
enum Month {
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
}
interface IEventCardProps {
	title: string
	description: string
	type: EventType
	/**
	 * time为单位为s的时间戳或者Date对象
	 */
	time: Time
	[key: string]: any
}
const formatDate = (time: Time) => {
	let date = time instanceof Date ? time : new Date(Number(time) * 1000)
	return `${Month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
const createEventElements: (
	type: EventType,
	data: IArticleitem[] | any[]
) => IEventCardProps[] = (type, data) => {
	let ret: IEventCardProps[] = []
	if (type === 'Blog Post') {
		;(data as IArticleitem[]).map((i) => {
			ret.push({
				id: i.id,
				title: i.title,
				description: i.subtitle,
				time: i.timestamp,
				type: type,
				url: `/article/${i.id}`,
			})
		})
	}
	return ret
}
const EventCard: React.FC<IEventCardProps> = (props) => {
	const {title, description, type, time, url} = props
	return (
		<Link to={url}>
			<div className="relative lg:w-128 pl-20 pr-20 mb-32 cursor-pointer">
				<div className="flex lg:absolute lg:right-full lg:pr-20 lg:text-white">
					<div className="mr-3 font-semibold whitespace-nowrap">{type}</div>
					<div className="whitespace-nowrap">{formatDate(time)}</div>
				</div>
				<div className="text-3xl font-bold mb-2">{title}</div>
				<div className="text-xl">{description}</div>
			</div>
		</Link>
	)
}
const EventCollection = () => {
	const [events, setEvents] = useState<IEventCardProps[]>([])
	const appContext = useAppContext()
	useEffect(() => {
		window.scrollTo({top: 0, behavior: 'smooth'})
		appContext.onHeaderModeChange('unwrap')
		http
			.post('/v1/api/article/list/pagination', {
				current: 1,
				pagesize: 10,
			})
			.then((e) => {
				if (e.data && e.data.code == 1) {
					let data: IArticleitem[] = e.data.data.data
					let events = createEventElements('Blog Post', data)
					setEvents(events)
					return
				}
				return Promise.reject('failed')
			})
			.catch((e) => {
				console.log(e)
			})
		return () => {
			appContext.onHeaderModeChange(undefined)
		}
	}, [])
	return (
		<div className="">
			{events.map((i) => (
				<EventCard key={i.id + i.title} {...i} />
			))}
		</div>
	)
}
const AuthorPostCard = () => {
	const Author = {
		title: "I'm Seth",
		description: 'But nothing to describe ...',
		github: 'https://github.com/chh-yu',
	}
	return (
		<div className="max-w-92 text-center lg:max-w-full relative lg:w-128 pl-20 pr-20 mb-32 mt-10 lg:mt-40">
			<div className="w-40 mx-auto mb-10 lg:mb-0 lg:w-auto lg:absolute lg:right-full lg:pr-20 lg:text-white">
				<div className="text-center overflow-hidden w-36 h-36 rounded-full mb-4">
					<img
						src="https://chyu123.top/img/avatar.png"
						alt="avatar"
						className="inline-block "
					/>
				</div>
				<div className="flex justify-around text-black lg:text-white">
					<a href={Author.github} target="_blank">
						<div className="iconfont icon-github-fill text-3xl cursor-pointer"></div>
					</a>
				</div>
			</div>
			<div className="text-5xl font-bold mb-6">{Author.title}</div>
			<div className="text-2xl">{Author.description}</div>
		</div>
	)
}
const Events = () => {
	return (
		<>
			{/* <div
        className="h-96 bg-cover bg-center"
        style={
            {'backgroundImage': `url(https://chyu123.top/img/back.webp)`} as any
        }
    >
        <div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white"></div>
    </div> */}
			<div className="flex">
				<div className="hidden lg:block lg:w-1/2 bg-black"></div>
				<div className="lg:w-1/2 bg-gray-100 min-h-screen">
					<AuthorPostCard />
					<EventCollection />
				</div>
			</div>
		</>
	)
}

export default Events

import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useAppContext} from '../contexts/AppContext'
import http from '../utils/http'
import {IArticleitem} from './Article'
import {EventCollection, AuthorPostCard, createEventElements, IEventCardProps, EventContainer} from '../components/Events'

const Personal = () => {
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
		<EventContainer>
			<>
				<AuthorPostCard />
				<EventCollection events={events} />
			</>
		</EventContainer>
	)
}

export default Personal

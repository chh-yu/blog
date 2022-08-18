import {useEffect, useState} from 'react'
import {Viewer} from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import http from '../utils/http'
import {formatDate, useScrollTotop} from '../utils/utils'
import {useParams} from 'react-router-dom'
import frontmatter from '@bytemd/plugin-frontmatter'
const plugins = [breaks(),frontmatter()]
interface IArticleContent {
	id: string | number
	title: string
	subtitle: string
	timestamp: string | number
	content: string
	cover: string
	[key: string]: any
}
const Articles: any = (props: object) => {
	const [data, setData] = useState<IArticleContent>(null)
	const [params] = useState(useParams())
	useScrollTotop()
	useEffect(() => {
		http.post('/v1/api/article/content', {
			id: params.titleid
		}).then((e) => {
			setData(e.data.data)
		})
	}, [params])
	return data ? (
		<div className='min-h-screen'>
			<div
				className="h-96 bg-cover bg-center"
				style={{'background-image': `url("${data.cover}")`} as any}
			>
				<div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                    <div className='font-extrabold text-3xl tracking-wider p-4'>{data.title}</div>
					<div className='mt-6 text-sm'>{formatDate(Number(data.timestamp)*1000)}</div>
                </div>
			</div>
            <div className='mt-4 mx-auto md:w-192 px-12 py-6 bg-white overflow-hidden'>
                <Viewer value={data.content} plugins={plugins}></Viewer>
                <div className='mx-auto my-12 w-1/3 border border-solid border-gray-700'></div>
            </div>
		</div>
	) : (
		<></>
	)
}
export default Articles

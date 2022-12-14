import {useCallback, useEffect, useRef, useState} from 'react'
import {Viewer} from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import http from '../utils/http'
import {formatDate, useScrollTotop} from '../utils/utils'
import {useParams} from 'react-router-dom'
import frontmatter from '@bytemd/plugin-frontmatter'
import ShareComponent from '../components/Share'
import ArticleCataLog, {useArticleContentNode} from '../components/ArticleCataLog'
import {Popover, message} from 'antd'

const plugins = [breaks(), frontmatter()]
interface IArticleContent {
	id: string | number
	title: string
	subtitle: string
	timestamp: string | number
	content: string
	cover: string
	[key: string]: any
}
const ArticleDetail: React.FC<any> = (props) => {
	const backToArticle = props.backToArticle
	const [data, setData] = useState<IArticleContent>(null)
	const [params] = useState(useParams())
	const [sharePopoverVisible, setSharePopoverVisible] = useState(false)
	const [like, setLike] = useState(false)
	const [articleRef, articleContentNode] = useArticleContentNode()
	useScrollTotop()
	useEffect(() => {
		http
			.post('/v1/api/article/content', {
				id: params.titleid,
			})
			.then((e) => {
				setData(e.data.data)
				document.title = e.data.data.title
			})
	}, [params])
	const hiddenSharePopover = useCallback(() => {
		setSharePopoverVisible(false)
	}, [setSharePopoverVisible])
	const copyShareLink = useCallback(async () => {
		await new Promise((resolve, reject) => {
			let url = window.location.href
			// console.log(url)
			resolve(url)
		})
			.then((url: string) => {
				return navigator.clipboard.writeText(url)
			})
			.then((e) => {
				message.success('复制成功')
			})
			.catch((e) => {
				message.error('复制失败')
			})
	}, [])
	return data ? (
		<div className="min-h-screen">
			<div
				className="h-96 bg-cover bg-center"
				style={{backgroundImage: `url("${data.cover}")`} as any}
			>
				<div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
					<div className="font-extrabold text-3xl tracking-wider p-4">
						{data.title}
					</div>
					<div className="mt-6 text-sm">
						{formatDate(Number(data.timestamp) * 1000)}
					</div>
				</div>
			</div>
			<div className="flex justify-between mt-4 mx-auto w-full md:min-w-192 px-2 lg:px-20">
				<div className="hidden lg:block sticky top-20 left-0 w-14 mr-10 mt-20 h-40">
					<div
						onClick={() => {
							setLike((like) => !like)
						}}
						className={`iconfont icon-zantong border rounded-full shadow-lg w-14 h-14 text-center leading-3.5rem text-xl mb-6 cursor-pointer
							${
								like
									? 'border-pink-600 text-pink-800'
									: 'lg:hover:border-pink-400 lg:hover:text-pink-600'
							}
						`}
					></div>
					<div
						onClick={() => {
							setSharePopoverVisible(true)
						}}
						className="hover-parent relative iconfont icon-zhuanfa border rounded-full shadow-lg w-14 h-14 text-center leading-3.5rem text-xl mb-6 cursor-pointer hover:border-blue-300  hover:text-blue-700"
					>
						<ul
							style={{color: 'black'}}
							className={`invisible hover-children absolute left-14 top-0 w-32 rounded-lg boder-gray-700 border px-4 bg-white`}
						>
							<li className="w-full">
								<ShareComponent
									name={data.title}
									targetId="@Set/share"
									content={
										<div
											onClick={() => {
												hiddenSharePopover()
											}}
											className="iconfont icon-jietu w-full h-6 text-center leading-6 text-base my-2 cursor-pointer hover:text-blue-700"
										>
											{' '}
											内容分享
										</div>
									}
								/>
							</li>
							<li className="w-full">
								<div
									onClick={() => {
										copyShareLink()
										hiddenSharePopover()
									}}
									className="iconfont icon-fuzhi w-full h-6 text-center leading-6 text-base leading-6 my-2 cursor-pointer hover:text-blue-700"
								>
									{' '}
									复制链接
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex-grow w-0 flex-shrink-0">
					<div
						id={'@Set/share'}
						className="w-full px-12 py-6 bg-white overflow-hidden"
					>
						<div ref={articleRef}>
							<Viewer value={data.content} plugins={plugins}></Viewer>
						</div>
						<div className="mx-auto my-12 w-1/3 border border-solid border-gray-700"></div>
					</div>
					<div className="md:hidden w-full flex justify-around h-32 items-center bg-white px-14">
						<div
							onClick={() => {
								setSharePopoverVisible(true)
							}}
							className="iconfont icon-zhuanfa border rounded-full shadow-lg w-16 h-16 text-center leading-4rem text-xl mb-6 cursor-pointer hover:border-purple-500 hover:text-purple-700"
						></div>
						<div
							onClick={() => {
								setLike((like) => !like)
							}}
							className={`iconfont icon-zantong border rounded-full shadow-lg w-16 h-16 text-center leading-4rem text-xl mb-6 cursor-pointer
								${like ? 'border-pink-600 text-pink-800' : ''}
							`}
						></div>
						<ul
							onClick={(e) => {
								e.stopPropagation()
							}}
							className={`fixed border-top boder-gray-700 left-0 pt-4 border-t border-gray-100 bottom-0 h-40 w-full bg-white hover:text-black ${
								sharePopoverVisible ? 'visible' : 'invisible'
							}`}
						>
							<li className="w-full">
								<ShareComponent
									name={data.title}
									targetId="@Set/share"
									content={
										<div
											onClick={() => {
												hiddenSharePopover()
											}}
											className="iconfont icon-jietu w-full h-6 text-center leading-6 text-base mb-4 cursor-pointer"
										>
											{' '}
											内容分享
										</div>
									}
								/>
							</li>
							<li className="w-full">
								<div
									onClick={() => {
										copyShareLink()
										hiddenSharePopover()
									}}
									className="iconfont icon-fuzhi w-full h-6 text-center leading-6 text-base mb-4 cursor-pointer"
								>
									{' '}
									复制链接
								</div>
							</li>
							<li className="w-full">
								<div
									onClick={(e) => {
										hiddenSharePopover()
									}}
									className="w-full h-6 text-center leading-6 text-base mb-4 cursor-pointer text-pink-900"
								>
									{' '}
									取消
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="hidden md:block sticky top-20 w-52 lg:w-72 ml-5 mt-20 h-screen-1/2 shadow-lg px-3 pb-6 rounded overflow-y-auto">
					<ArticleCataLog
						title={
							<div className="h-14 leading-3.5rem text-xl font-bold mx-1">
								目录
							</div>
						}
						articleContentNode={articleContentNode != null ? articleContentNode.childNodes[0] : articleContentNode}
					/>
				</div>
			</div>
			<div
				onClick={() => {
					backToArticle()
				}}
				className="iconfont icon-fanhui inline-block fixed cursor-pointer right-8 bottom-8 w-14 h-14 bg-opacity-0 rounded-full leading-3.5rem text-center shadow-lg "
			></div>
		</div>
	) : (
		<></>
	)
}
export default ArticleDetail

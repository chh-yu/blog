import {useCallback, useEffect, useState} from 'react'
import {Viewer} from '@bytemd/react'
import breaks from '@bytemd/plugin-breaks'
import http from '../utils/http'
import {formatDate, useScrollTotop} from '../utils/utils'
import {useParams} from 'react-router-dom'
import frontmatter from '@bytemd/plugin-frontmatter'
import ShareComponent from '../components/Share'
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
const Articles: React.FC<any> = (props) => {
	const backToHome = props.backToHome
	const [data, setData] = useState<IArticleContent>(null)
	const [params] = useState(useParams())
	const [sharePopoverVisible, setSharePopoverVisible] = useState(false)
	const [like, setLike] = useState(false)
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
	const copyShareLink = useCallback(async (cb?: Function) => {
		if (cb) cb()
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
			<div className="flex justify-between mt-4 mx-auto w-full md:w-192">
				<div className="hidden md:block sticky top-20 left-0 w-14 mr-10 mt-20 h-40">
					<div
						onClick={() => {
							setLike((like) => !like)
						}}
						className={`iconfont icon-zantong border rounded-full shadow-lg w-14 h-14 text-center leading-3.5rem text-xl mb-6 cursor-pointer
							${like ? "border-pink-600 text-pink-800" : "hover:border-pink-400 hover:text-pink-600"}
						`}
					></div>

					<Popover
						placement="right"
						visible={sharePopoverVisible}
						onVisibleChange={(newVisible: boolean) => {
							setSharePopoverVisible(newVisible)
						}}
						content={
							<ul className="w-24">
								<li className="w-full">
									<ShareComponent
										name={data.title}
										targetId="@Set/share"
										content={
											<div
												onClick={() => {
													hiddenSharePopover()
												}}
												className="iconfont icon-jietu w-full h-6 text-center leading-6 text-base mb-6 cursor-pointer hover:border-purple-500 hover:text-purple-700"
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
											copyShareLink(hiddenSharePopover)
										}}
										className="iconfont icon-fuzhi w-full h-6 text-center leading-6 text-base mb-6 cursor-pointer hover:border-purple-500 hover:text-purple-700"
									>
										{' '}
										复制链接
									</div>
								</li>
							</ul>
						}
					>
						<div className="iconfont icon-zhuanfa border rounded-full shadow-lg w-14 h-14 text-center leading-3.5rem text-xl mb-6 cursor-pointer hover:border-purple-500 hover:text-purple-700"></div>
					</Popover>
				</div>
				<div className='flex-grow w-0 flex-shrink-0'>
					<div
						id={'@Set/share'}
						className="w-full px-12 py-6 bg-white overflow-hidden"
					>
						<Viewer value={data.content} plugins={plugins}></Viewer>
						<div className="mx-auto my-12 w-1/3 border border-solid border-gray-700"></div>
					</div>
					<div className="md:hidden w-full flex justify-around h-32 items-center bg-white px-14">
						<Popover
							placement="top"
							visible={sharePopoverVisible}
							onVisibleChange={(newVisible: boolean) => {
								setSharePopoverVisible(newVisible)
							}}
							content={
								<ul className="w-24">
									<li className="w-full">
										<ShareComponent
											name={data.title}
											targetId="@Set/share"
											content={
												<div
													onClick={() => {
														hiddenSharePopover()
													}}
													className="iconfont icon-jietu w-full h-6 text-center leading-6 text-base mb-6 cursor-pointer hover:border-purple-500 hover:text-purple-700"
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
												copyShareLink(hiddenSharePopover)
											}}
											className="iconfont icon-fuzhi w-full h-6 text-center leading-6 text-base mb-6 cursor-pointer hover:border-purple-500 hover:text-purple-700"
										>
											{' '}
											复制链接
										</div>
									</li>
								</ul>
							}
						>
							<div className="iconfont icon-zhuanfa border rounded-full shadow-lg w-16 h-16 text-center leading-4rem text-xl mb-6 cursor-pointer hover:border-purple-500 hover:text-purple-700"></div>
						</Popover>
						<div
							onClick={() => {
								setLike((like) => !like)
							}}
							className={`iconfont icon-zantong border rounded-full shadow-lg w-16 h-16 text-center leading-4rem text-xl mb-6 cursor-pointer
								${like ? "border-pink-600 text-pink-800" : ""}
							`}
						></div>
					</div>
				</div>
			</div>
			<div
				onClick={() => {
					backToHome()
				}}
				className="iconfont icon-fanhui inline-block fixed cursor-pointer right-8 bottom-8 w-14 h-14 bg-opacity-0 rounded-full leading-3.5rem text-center shadow-lg "
			></div>
		</div>
	) : (
		<></>
	)
}
export default Articles

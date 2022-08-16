import {useEffect, useCallback, useState} from 'react'
import {debounce} from '../utils/utils'
import {Link, Location} from 'react-router-dom'
const Header: any = () => {
	const [isTop, setIsTop] = useState(false)
	const [nav, setNav] = useState(false)
	useEffect(() => {
		const compute = debounce(() => {
			document.body.getClientRects()[0].top >= 0
				? setIsTop(true)
				: setIsTop(false)
			// console.log(document.body.getClientRects()[0].top >= 0)
		}, 25)
		compute()
		document.body.onscroll = () => {
			compute()
		}
		console.log()
	}, [])
	return (
		<>
			<div
				id="Header"
				className={`z-20 flex justify-around fixed top-0 w-full h-14 ${
					isTop ? 'bg-transparent text-white' : 'bg-white shadow-lg'
				}`}
			>
				<div className="hidden md:flex gap-8 leading-3.5rem">
					<div className="cursor-pointer">
						<Link to="/" >首页</Link>
					</div>
					<div className="cursor-pointer">
						<Link to="/talk">空间</Link>
					</div>
					<div className="cursor-pointer">事件</div>
					<div className="cursor-pointer">我</div>
				</div>
				<div onClick={()=>{setNav(!nav)}} className="cursor-pointer iconfont icon-caidan text-2xl leading-3.5rem md:hidden absolute left-8 h-14 w-14"></div>
				{nav && (
					<div onClick={()=>{setNav(false)}} className="fixed top-14 z-40 w-full text-white">
						<div className="cursor-pointer mx-14 h-10 leading-10 border-b border-gray-300 border-solid">
							<Link to="/">首页</Link>
						</div>
						<div className="cursor-pointer mx-14 h-10 leading-10 border-b border-gray-300 border-solid">
							<Link to="/talk">空间</Link>
						</div>
						<div className="cursor-pointer mx-14 h-10 leading-10 border-b border-gray-300 border-solid">
							事件
						</div>
						<div className="cursor-pointer mx-14 h-10 leading-10 border-b border-gray-300 border-solid">
							我
						</div>
					</div>
				)}
			</div>
			{nav && (
				<div className="fixed top-0 z-10 h-screen w-screen bg-black	bg-opacity-90"></div>
			)}
		</>
	)
}
export default Header

import { useRef, useCallback } from "react"
import { useAppContext } from "../contexts/AppContext"
const Poster = ({
	picture, 
	isArrowExist = true,
	mode = 'auto',
    shadow = false
}: {
	picture: string, 
	isArrowExist?: boolean,
	mode?: 'auto' | 'screen' | 'small'
    shadow?: boolean
}) => {
	const ref = useRef()
	const appContext = useAppContext()
	const arrowClick = useCallback(() => {
		// console.log(appContext.headerHeight)
		if (ref.current) {
			const el: any = ref.current
			const height =
				// el.clientHeight - document.getElementById('Header').clientHeight
				el.clientHeight - appContext.headerHeight
			window.scrollTo({top: height, behavior: 'smooth'})
		}
	}, [ref])
	const imgStyle = mode == 'auto'
		? "w-screen h-64 md:h-screen object-cover"
		: mode == 'screen' ? "w-screen h-screen object-cover" : "w-screen h-96 object-cover"
	return (
		<div className="relative select-none" ref={ref}>
			<img
				className={imgStyle}
				src={picture}
			/>
            {shadow && <div
                className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-50"
            >
            </div>}
			{isArrowExist && <div
				onClick={arrowClick}
				className="iconfont icon-jiantouxia absolute bottom-8 mx-auto text-white w-9 h-9 right-0 left-0 font text-3xl cursor-pointer animate-pulse"
			></div>}
		</div>
		
	)
}
export default Poster
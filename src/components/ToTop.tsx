import { useCallback } from "react"
const ToTop = () => {
    const clickToTop = useCallback(() => {
		window.scrollTo({top: 0, behavior: 'smooth'})
	}, [])
	
	return (
		<>
			<div onClick={clickToTop} className="animate-bounce iconfont icon-jiantoushang inline-block fixed cursor-pointer right-8 bottom-14 w-14 h-14 bg-opacity-0 rounded-full leading-3.5rem text-center shadow-lg "></div>
		</>
	)
}
export default ToTop

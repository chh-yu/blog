import html2canvas from 'html2canvas'
import React, {
	Children,
	MouseEventHandler,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import ReactDOM, {createPortal} from 'react-dom'
import {message, Spin} from 'antd'

interface ShareProps {
	targetId: string
	content: any,
    name: string
}
interface FullScreenPictureProps {
	canvas: any
	display: boolean
	setDisplay: Function,
    downloadImage: Function,
    canvasReady: boolean
}
const FullScreenPicture: React.FC<FullScreenPictureProps> = (props) => {
	const {display, setDisplay, canvas, canvasReady} = props
	const draw = useCallback(
		(node: any) => {
            if(node){
                while (node.firstChild) {
                    node.removeChild(node.firstChild)
                }
                node.append(canvas)
            }
		},
		[canvas]
	)
    const downloadImage: MouseEventHandler<HTMLDivElement> = (e)=>{
        e.stopPropagation()
        new Promise((resolve, reject)=>{
            try {
                props.downloadImage()
            } catch (error) {
                reject(e)
            }
        })
        .catch(()=>{
            message.warning('保存异常')
        })
    }
	return createPortal(
		<>
			{display && (
				<div
					onClick={(e) => {
                        console.log(1)
						setDisplay(false)
					}}
					className={`fixed z-50 flex justify-center items-center top-0 left-0 bg-gray-500 bg-opacity-50 h-full w-full cusor-pointer`}
				>
					{canvasReady && <div
						ref={draw}
						className="w-11/12 h-full p-4 flex justify-center"
					></div>}
                    <div onClick={downloadImage} className="iconfont icon-baocun inline-block fixed cursor-pointer right-8 bottom-20 w-14 h-14 bg-pink-700 rounded-full leading-3.5rem text-center shadow-lg text-white text-xl hover:bg-pink-500"></div>
				</div>
			)}
		</>,
		document.getElementById('app')
	)
} //设计组件中，计划用createPortal将全屏组件发往较高层的元素进行绑定，解决固定定位的层级问题

const ShareComponent: React.FC<ShareProps> = (props) => {
	const [display, setDisplay] = useState(false)
	const [canvas, setCanvas] = useState<HTMLCanvasElement>(null)
    const name = props.name
    const [canvasReady, setCanvasReady] = useState(false)
	const getPicture = useCallback((e: any) => {
		let el: HTMLElement = document.getElementById(props.targetId)
        setDisplay(true)
		html2canvas(el).then(function (canvas) {
			canvas.style.height = '100%'
			canvas.style.width = 'auto'
			setCanvas(canvas)
			setCanvasReady(true)
			// ref.current.appendChild(canvas)
		})
	}, [])
    const downloadImage = useCallback(()=>{
        if(canvas){
            let url = canvas.toDataURL("image/png")
            let a = document.createElement('a')
            a.download = name
            a.href = url
            a.click()
            window.URL.revokeObjectURL(url)
        }
    }, [canvas])
	return (
		<>
			<div onClick={getPicture}>{props.content}</div>
			<FullScreenPicture
                canvasReady={canvasReady}
				display={display}
				setDisplay={setDisplay}
				canvas={canvas}
                downloadImage={downloadImage}
			/>
		</>
	)
}
export default ShareComponent

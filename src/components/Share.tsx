import html2canvas from 'html2canvas'
import { useCallback, useRef, useState } from 'react'

export const ShareComponent = ()=>{
    const ref: any = useRef()
    const [display, setDisplay] = useState(false)
    const getPicture = useCallback(()=>{
		let el = document.getElementById("@Set/share")
		html2canvas(el).then(function(canvas) {
            setDisplay(true)
            canvas.style.height = "100%"
            canvas.style.width = "auto"
			ref.current.appendChild(canvas);
		});
	}, [ref])
    return (<>
        <div onClick={getPicture} className='cursor-pointer'>getpicture</div>
        <div className={`fixed z-50 flex justify-center items-center top-0 bg-gray-500 bg-opacity-50 h-full w-full ${display ? 'block' : 'hidden'}`}>
            <div ref={ref} className="w-11/12 h-full overflow-scroll p-4 bg-black bg-opacity-70 flex justify-center"></div>
        </div>
    </>)
}
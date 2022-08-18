import { useCallback, useEffect, useState } from "react"
export const debounce = (cb: Function, time: number): Function=>{
    let timer: any = null
    return (...args: any[])=>{
        clearTimeout(timer)
        timer = setTimeout(()=>{
            cb(...args)
            clearTimeout(timer)
        }, time)
    }
}
export const throttle = (cb: Function, time: number): Function=>{
    let timer: any = null
    return (...args: any[])=>{
        if(!timer)
            timer = setTimeout(()=>{
                cb(...args)
                clearTimeout(timer)
                timer = null
            }, time)
    }
}
export const formatDate = function(time: number | string | Date){
    var date = new Date(time);
 
    var year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
                (month < 10? '0' + month : month) + '-' +
                (day < 10? '0' + day : day) + ' ' +
                (hour < 10? '0' + hour : hour) + ':' +
                (min < 10? '0' + min : min) + ':' +
                (sec < 10? '0' + sec : sec);
 
    return newTime;         
}
export const useVisibleRef = ()=>{
    const [visible, setVisivle] = useState<boolean>(false)
    const visibleRef: any = useCallback((node: any)=>{
        if(node != null){
            const visibleThrottle: any = throttle(()=>{
                let {top} = node.getBoundingClientRect()
                if(top < window.innerHeight){
                    setVisivle(true)
                    window.removeEventListener('scroll', visibleThrottle)
                }
            }, 200)
            let {top} = node.getBoundingClientRect()
            if(top < window.innerHeight){
                setVisivle(true)
                window.removeEventListener('scroll', visibleThrottle)
            }else{
                window.addEventListener('scroll', visibleThrottle)
            }
        }
    }, [])
    return [visible, visibleRef]
}
export const useScrollTotop = ()=>{
	useEffect(()=>{
        window.scrollTo(0, 0)
    }, [])
}
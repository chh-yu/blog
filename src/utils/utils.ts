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
export const formatDate = function($date: number | string | Date, time: boolean = true){
    var date = new Date($date);
 
    var year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime
    if(time)
        newTime = year + '-' +
            (month < 10? '0' + month : month) + '-' +
            (day < 10? '0' + day : day) + ' ' +
            (hour < 10? '0' + hour : hour) + ':' +
            (min < 10? '0' + min : min) + ':' +
            (sec < 10? '0' + sec : sec);
    else
        newTime = year + '-' +
            (month < 10? '0' + month : month) + '-' +
            (day < 10? '0' + day : day)
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
const addOneDay = function(currentDay: string | number | Date) {
    let d: Date = new Date(currentDay);
    d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}
export const getEveryDay = function(startDate: string | number | Date, endData: string | number | Date) {
    let dateList = [addOneDay(new Date(startDate))];
    let dayCount: number = (new Date(endData).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
    for (let i = 0; i < dayCount-1; i++) {
        let currentDay = addOneDay(dateList[i]);
        currentDay = formatDate(currentDay, false);
        dateList.push(currentDay);
    }
    return dateList;
}
export const randomNumber = (min=0, max=1)=>{
    let {floor, random} = Math
    return floor(random()*(max-min)+min)
}
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../contexts/AppContext'


interface IArticleCataLogProps {
    /**
     * title: ReactNode | string
     */
    title: ReactNode | string,
    /**
     * articleContentNode: markdown文章的dom根节点
     */
    articleContentNode: HTMLElement
}
interface IArticleCataLog extends React.FC<IArticleCataLogProps> {
    // useArticleContentNode: Function
}
/**
 * 生成虚拟的文章目录组件元素
 * hDom 表示对应的在markdown中的h标签的真实元素，用于计算位置
 */
class VirCataLogItem {
    artribute: string[]
    title: string
    hDom: HTMLElement
    constructor(artribute: string[], title: string, hDom: HTMLElement){
        this.artribute = artribute
        this.title = title
        this.hDom = hDom
    }
    toTop(offsetTop: number){
        let rectList: DOMRectList = this.hDom.getClientRects()
        let y_distance = rectList[0].y - offsetTop
        window.scrollBy({
            left: 0,
            top: y_distance,
            behavior: 'smooth'
        })
    }
}
const GenerateCataLog = (articleContentNode: HTMLElement)=>{
    const node = articleContentNode
    const itemArr: VirCataLogItem[] = []
    node.childNodes.forEach((i) => {
        let match = i.nodeName.match(/^H(\d)$/)
        if (match) {
            let marginLeft = match[1]
            let artibute = 'text-base leading-8 cursor-pointer rounded hover:bg-gray-200 overflow-hidden whitespace-nowrap overflow-ellipsis'.split(' ')
            artibute.push(`ml-${marginLeft}`)
            itemArr.push(new VirCataLogItem(artibute, i.textContent, i as any))
        }
    })
    return itemArr
}
/**
 * 具有markdown文章h标签导航功能的目录组件
 */
export const ArticleCataLog: IArticleCataLog = (props) => {
    const articleContentNode = props.articleContentNode
    const title = props.title
    const [cataLogItems, setCataLogItems] = useState(null)
    const {headerHeight} = useAppContext()
    useEffect(()=>{
        if(articleContentNode){
            let cataLogItems: VirCataLogItem[] = GenerateCataLog(articleContentNode)
            setCataLogItems(cataLogItems)
        }
    }, [articleContentNode])
    if(!articleContentNode) return <></>
    return <div>
        <>{title}</>
        <div className='border border-gray-400 mb-3'></div>
        {cataLogItems && cataLogItems.map((i: VirCataLogItem, index: number)=>(<div key={index} onClick={()=>i.toTop(headerHeight)} className={i.artribute.join(' ')}>{i.title}</div>))}
    </div>
}
/**
 * 
 * @returns [ref, articleContentNode]
 */
export const useArticleContentNode = ()=>{
    const[ articleContentNode, setArticleContentNode] = useState(null)
    const ref = useCallback((node: HTMLElement)=>{
        setArticleContentNode(node)
    }, [])
    return [ref, articleContentNode]
}
export default ArticleCataLog

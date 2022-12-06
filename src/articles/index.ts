import React from 'react'
import config from './articles.config.json'
config.articles.map((i: IArticle)=>{
    i.Component = React.lazy(()=>import(`./${i.title}.mdx`))
})

interface IArticle {
	title: string
	subtitle: string
	timestamp: string | number
	cover: string
	[key: string]: any,
    Component: React.FC
}
const articles: IArticle[] = config.articles
export default articles
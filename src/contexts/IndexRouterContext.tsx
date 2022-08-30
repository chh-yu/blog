import {
	useContext,
	createContext,
	ReactNode,
} from 'react'
/**
 * 提供IndexRouter
 */
interface IIndexRouterContext {
	indexNavigate: (path: string)=>void
}

const IndexRouterContext = createContext<IIndexRouterContext>(null)

export const IndexRouterContextProvider = ({
    indexNavigate,
	children = null,
}: {
    indexNavigate: (path: string)=>void,
	children?: ReactNode
}) => {
	return (
		<IndexRouterContext.Provider
			value={{
				indexNavigate
			}}
		>
            {children}
        </IndexRouterContext.Provider>
	)
}
export const useIndexRouterContext = ()=>{
    return useContext(IndexRouterContext)
}
export default IndexRouterContextProvider
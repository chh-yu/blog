import {
	useContext,
	useState,
	createContext,
	ReactElement,
	ReactNode,
} from 'react'
/**
 * 提供App上下文变量
 * headerHeight保存Header组件的高度
 * 
 */
interface IAppContext {
	headerHeight: number
	onHeaderHeightChange: (height: number) => void
}

const Appcontext = createContext<IAppContext>(null)

export const AppContextProvider = ({
	children = null,
}: {
	children?: ReactNode
}) => {
	const [headerHeight, setHeaderHeight] = useState(undefined)
	const onHeaderHeightChange = (headerHeight: number) => {
		setHeaderHeight(headerHeight)
	}
	return (
		<Appcontext.Provider
			value={{
				headerHeight,
				onHeaderHeightChange,
			}}
		>
            {children}
        </Appcontext.Provider>
	)
}
export const useAppContext = ()=>{
    return useContext(Appcontext)
}
export default AppContextProvider
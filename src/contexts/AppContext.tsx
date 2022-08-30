import {
	useContext,
	useState,
	createContext,
	ReactElement,
	ReactNode,
} from 'react'
export type HeaderMode = 'unwrap' | undefined
/**
 * 提供App上下文变量
 * headerHeight保存Header组件的高度
 * HeaderMode设置为'unwrap'时，强制头部菜单收缩
 */
interface IAppContext {
	headerHeight: number
	onHeaderHeightChange: (height: number) => void,
    headerMode: HeaderMode,
    onHeaderModeChange: (mode: HeaderMode) => void
}

const AppContext = createContext<IAppContext>(null)

export const AppContextProvider = ({
	children = null,
}: {
	children?: ReactNode
}) => {
	const [headerHeight, setHeaderHeight] = useState(undefined)
	const onHeaderHeightChange = (headerHeight: number) => {
		setHeaderHeight(headerHeight)
	}
    const [headerMode, setHeaderMode] = useState<HeaderMode>(undefined)
    const onHeaderModeChange = (mode: HeaderMode) => {
        setHeaderMode(mode)
    }
	return (
		<AppContext.Provider
			value={{
				headerHeight,
				onHeaderHeightChange,
                headerMode,
                onHeaderModeChange
			}}
		>
            {children}
        </AppContext.Provider>
	)
}
export const useAppContext = ()=>{
    return useContext(AppContext)
}
export default AppContextProvider
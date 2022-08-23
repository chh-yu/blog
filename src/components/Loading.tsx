import { Spin } from "antd"
const Loading: React.FC = ()=>{
    return (<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <Spin size="large" />
    </div>)
}
export default Loading
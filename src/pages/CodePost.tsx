import React from "react"
import Poster from "../components/Poster"
import Building from '../components/Building'
import {EventCollection, createEventElements, IEventCardProps, EventContainer, EventCard} from '../components/Events'

const CodePost: React.FC = ()=>{
    return (<>
        <Poster picture="https://heliopolis.top:8000/88584acab3fe836d2f436b0497c5e28d.jpg" mode="small" shadow={true} />
        <EventContainer>
            <>
                <EventCard title="test1" description="nothing" type='Code Post' time={1663082107} url=''></EventCard>
                <EventCard title="test2" description="nothing" type='Code Post' time={1663082107} url=''></EventCard>
            </>
        </EventContainer>
        {/* <Building /> */}
    </>)
}
export default CodePost
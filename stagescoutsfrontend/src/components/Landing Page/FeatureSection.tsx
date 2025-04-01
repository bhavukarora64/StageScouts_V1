import { Link } from "react-router-dom";
import Location from "../../assets/Location";
import RightArrow from "../../assets/RightArrow";
import Button from "../Common Components/Button";
import { useEffect, useState } from "react";

export interface IEvent {
    eventId: string;
    eventName: string;
    eventImage: string;
    eventVenue: string;
}

function FeatureSection(){
    const [events, setEvents] = useState<IEvent[] | null>(null);

    async function getEvents(page:number | null){
        const data  = await fetch('https://stage-scouts-v1-backend.vercel.app/api/events/all?pageNumber=' + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicatiposton/json'
            }
        })

        const response = await data.json();
        const latestEvents = response.slice(0, 3);
        setEvents(latestEvents);
    }
    
    useEffect(() => {
        getEvents(0);
    }, [])

    return (
        <div className="w-full px-18 pt-30 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-xl md:text-2xl lg:2-xl xl:text-3xl font-bold my-10">Popular Events</h1>
                <Link to="/venues">
                    <div className="flex items-center gap-2 cursor-pointer hover:underline">
                        <p>View all venues</p>
                        <RightArrow imageProp="md" />
                    </div>
                </Link>
                
            </div>
            
            <div className="grid grid-cols-12">
                { events?.map((event) => (
                    <div id={event.eventId.toString()} className="transition-all transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-gray-400 mx-4 pb-5 mt-5 border-1 border-gray-300 rounded-xl col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                        <img src={event.eventImage} className="rounded-t-xl h-48 md:h-64 lg:h-76 xl:86 w-full"></img>
                        <div className="ml-5 mt-5 leading-10">
                            <h1 className="font-bold text-2xl">{event.eventName}</h1>
                            <div className="flex items-center gap-1">
                                <Location imageProp="lg"/>
                                <p className="text-gray-500"> {event.eventVenue}</p>
                            </div>
                            <br></br>
                        </div>
                        <div className="mx-5 mb-2">
                            <Link to={"http://localhost:5173/venueSeating?venueName=" + event.eventVenue}>
                                <Button title="Visit Seating" buttonType="primary" buttonSize="lg" backIcon={<RightArrow imageProp="md"/>} customStyle="w-full"/>
                            </Link>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}

export default FeatureSection;


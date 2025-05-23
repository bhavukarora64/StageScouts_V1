import { Link } from "react-router-dom";
import RightArrow from "../../assets/RightArrow";
import Location from "../../assets/Location";
import Button from "../Common Components/Button";
import Date from "../../assets/Date";
import { useEffect, useRef, useState } from "react";
const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;
const frontendBaseURL = import.meta.env.VITE_FRONTEND_BASE_URL;

function UpcomingEvents(){

    interface IEvent{
        eventId: string
        eventName: string
        eventImage: string
        eventVenue: string
        eventDate: string
        eventURL: string
    }

    const [events, setEvents] = useState<IEvent[] | null>([]);
    const currentPage = useRef(0); 

    // Sends the new user to top of the screen
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    // Fetch the Events list from the Ticket Master API
    async function getEvents(page:number | null){
        const data  = await fetch(`${backendBaseURL}/api/events/all?pageNumber=` + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicatiposton/json'
            }
        })

        const response = await data.json();
        // @ts-expect-error:Define a interface here as per the props
        currentPage.current = page
        setEvents(response);
    }

    useEffect(() => {
        getEvents(0);
    }, [])

    return (
        <div className="w-full px-18 pt-30 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-xl md:text-2xl lg:2-xl xl:text-3xl font-bold my-10">Upcoming Events</h1>
                
            </div>
            
            <div className="grid grid-cols-12">
                { events?.map((event:IEvent) => {
                    return(
                    <div key={event.eventId} className="transition-all duration-300 ease-in-out mx-4 pb-5 my-4 border-1 border-gray-300 rounded-xl hover:scale-105 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                        <img src={event.eventImage} className="rounded-t-xl h-64 lg:h-76 xl:86 w-full"></img>
                        <div className="ml-5 mt-5 leading-10">
                            <h1 className="font-bold text-2xl">{event.eventName}</h1>
                            <div className="flex items-center gap-1">
                                <Date imageProp="lg"/>
                                <p className="text-gray-500"> {event.eventDate}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Location imageProp="lg"/>
                                <p className="text-gray-500"> {event.eventVenue}</p>
                            </div>
                            <br></br>
                        </div>
                        <div className="mx-5 flex flex-col justify-center items-center">
                                    <Link to={event.eventURL} target="_blank" className="w-full flex justify-center"><Button title="Buy Tickets" buttonType="primary" buttonSize="lg" backIcon={<RightArrow imageProp="md"/>} customStyle="w-[95%]"/></Link>
                                    <Link to={`${frontendBaseURL}/venueSeating?venueName=` + event.eventVenue} className="flex gap-2 mt-2 hover:underline">
                                        <p>Visit Seating </p> 
                                        <RightArrow imageProp="md"/>
                                    </Link>
                                </div>
                    </div>)})}
            </div>
            <div className="flex justify-center items-center mt-10 gap-5">
                <Button onClick={handleBack} title="Back" buttonType="secondary" buttonSize="md"/>
                <p className="text-black font-bold">{currentPage.current}</p>
                <Button onClick={handleNext} title="Next" buttonType="secondary" buttonSize="md"/>
            </div>
        </div>
    )
    function handleNext(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        getEvents(currentPage.current + 1);
    }

    function handleBack(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        getEvents(currentPage.current <= 0 ? 0 : currentPage.current - 1);
    }
}

export default UpcomingEvents;
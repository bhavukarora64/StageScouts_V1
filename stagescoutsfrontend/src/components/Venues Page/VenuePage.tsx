import { Link } from "react-router-dom";
import RightArrow from "../../assets/RightArrow";
import Location from "../../assets/Location";
import Button from "../Common Components/Button";
import { useEffect, useRef, useState } from "react";
import Navbar from "../Events Page/Navbar";
import Footer from "../Common Components/Footer";
import ImageUnavailable from "../../assets/ImageUnavailable";
import Search from "../../assets/Search";
const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

function Venues(){

    const [venues, setVenues] = useState([]);
    const [keyword, setKeyword] = useState("");
    const currentPage = useRef(0); 

    // Sends the new user to top of the screen
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    // Fetch the Venues list from the Ticket Master API
    async function getVenues(page: number | null){
        page = page || 0
        const data  = await fetch(`${backendBaseURL}/api/venues/all?pageNumber=` + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await data.json();

        setVenues(response.venues);

        currentPage.current = page
    }

    useEffect(() => {
        getVenues(0);
    }, [])

    async function searchVenue(){
        
        const data = await fetch(`${backendBaseURL}/api/venues/search?keyword=` + keyword, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await data.json();

        setVenues(response.venues);
        
    }

    return (
        <>
            <Navbar />
            <div className="w-full px-18 pt-30 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-xl md:text-2xl lg:2-xl xl:text-3xl font-bold my-10">Venues</h1>
                <div onClick={searchVenue} className="flex items-center border-2 gap-2 border-gray-300 rounded-md cursor-pointer">
                    <input type="text" onChange={(e) => setKeyword(e.target.value) } placeholder="Search Venues" className="w-36 md:w-54 lg:w-72 xl:w-84 h-11 px-3 border-gray-300 rounded-md"></input>
                    I
                    <Search imageProp="lg"/>
                    <br></br>
                </div>
                
            </div>
            
            {venues ? (
                <div>
                    <div className="grid grid-cols-12">
                        {
                        venues.map((venues) => (
                            // @ts-expect-error:Define a interface here as per the props
                            <div key={venues.venueId} className="transition-all duration-300 ease-in-out mx-4 pb-5 my-4 border-1 border-gray-300 rounded-xl hover:scale-105 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 h-auto flex flex-col justify-between">
                            {/* @ts-expect-error:Define a interface here as per the props */}
                                {venues.venueImage !== "unavailable" ? (
                            // @ts-expect-error:Define a interface here as per the props
                                    <img src={venues.venueImage} className="rounded-t-xl h-64 lg:h-76 xl:86 w-auto" alt="Venue" />
                                    ) : (
                                    <ImageUnavailable />
                                )}
                                <div className="ml-5 mt-5 leading-10">
                                {/* @ts-expect-error:Define a interface here as per the props */}
                                    <h1 className="font-bold text-xl mt-10">{venues.venueName}</h1>
                                    <div className="flex items-center gap-1">
                                        <Location imageProp="lg"/>
                                         {/* @ts-expect-error:Define a interface here as per the props */}
                                        <p className="text-gray-500"> {venues.venueLocation}</p>
                                    </div>
                                    <br></br>
                                </div>
                                <div className="flex flex-col gap-5 text-center mx-3">
                                {/* @ts-expect-error:Define a interface here as per the props */}
                                    <Link to={"/venueSeating?venueId=" + venues.venueId +  "&venueName=" + venues.venueName} className="flex justify-center"><Button title="Visit Seating" buttonType="primary" buttonSize="lg" backIcon={<RightArrow imageProp="md"/>} customStyle="w-[90%]"/></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-10 gap-5">
                        <Button onClick={handleBack} title="Back" buttonType="secondary" buttonSize="md"/>
                        <p className="text-black font-bold">{currentPage.current + 1}</p>
                        <Button onClick={handleNext} title="Next" buttonType="secondary" buttonSize="md"/>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <ImageUnavailable/>
                    <p>No Venues found for the search</p>
                </div>
            )}
        </div>
        <Footer />
        </>
    )

    function handleNext(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        getVenues(currentPage.current + 1);
    }

    function handleBack(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        getVenues(currentPage.current <= 0 ? 0 : currentPage.current - 1);
    }
}

export default Venues;
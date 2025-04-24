import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Star from "../../assets/Star";
import Button from "../Common Components/Button";
import Navbar from "../Events Page/Navbar";
import Footer from "../Common Components/Footer";
import ImageUnavailable from "../../assets/ImageUnavailable";
import LeftArrow from "../../assets/LeftArrow";
import VenueSeatingModal from "./VenueSeatingModal";
import { useEffect, useState } from "react";
import Upload from "../../assets/Upload";
import { useRecoilState } from "recoil";
import { isLoggedIn as loginState } from "../../assets/store/userAtom";
const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;


function VenueSeating(){
    const [searchParams] = useSearchParams();
    const venueId = searchParams.get('venueId')
    const venueName = searchParams.get('venueName')
    const [visible, setVisible] = useState(false);
    const [seats, setSeats] = useState([]);
    const [isLoggedIn] = useRecoilState(loginState);
    const navigate = useNavigate();

    async function fetchSeatViews(){

        const data = await fetch(`${backendBaseURL}/api/image?venueId=` + venueId + '&venueName=' + venueName, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await data.json();
        setSeats(response);
    }

    useEffect(() => {
        fetchSeatViews()
    }, [])

    return (
        <div>
            <VenueSeatingModal visible={visible} setVisible={setVisible} />
            <Navbar />
            <div className="w-full px-18 pt-20 pb-20">
                <Link to="/venues" className="flex gap-5 w-30 items-center mr-5 hover:underline my-10"> 
                    <LeftArrow imageProp="md"/>
                    <p>All Venues</p>
                </Link>
                <div className="flex justify-between items-center my-10">
                    <div>
                        <h1 className="text-3xl font-bold">{venueName} Seat Views</h1>
                        <p>Browse photos uploaded by fans to see the view from different seats</p>
                    </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Button onClick={() => {
                                if (isLoggedIn) {
                                    setVisible(prevValue => !prevValue);
                                } else {
                                    navigate('/login');
                                }
                            }} title="Upload" buttonType="primary" buttonSize="md" frontIcon={<Upload imageProp="md"/>} customStyle="w-full"/>
                        </div>
                </div>
                <div className="grid grid-cols-12">
                   {seats.length > 0 ? (
                        seats.map((venues: { seatId: string; seatImage: string; seatImageURL: string; rowSeats: string; rating: number; comment: string; reviewerName: string; reviewDate: string }) => { 
                            return(
                                <div key={venues.seatId} className="transition-all duration-300 ease-in-out mx-4 pb-5 my-4 border-1 border-gray-300 rounded-xl hover:scale-110 col-span-12 md:col-span-6 xl:col-span-4">
                                    {venues.seatImage !== "unavailable" ? (
                                        <div className="flex justify-center bg-gray-200">
                                            <img src={venues.seatImageURL} className="h-72 w-auto " alt="Venue" />
                                        </div>
                                    ) : (
                                        <ImageUnavailable />
                                    )}
                                    <div className="flex w-full justify-between px-4 mt-5 font-bold">
                                        <h1>{venues.rowSeats}</h1>
                                        <div className="flex items-center">
                                            {Array.from({ length: venues.rating }, (_, i) => (
                                                <Star key={i} imageProp="md" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="px-4">{venues.comment}</div>
                                    <div className="flex w-full justify-between px-4 pt-10 text-gray-500">
                                        <h1>{venues.reviewerName}</h1>
                                        <h1>{(venues.reviewDate).split('T')[0]}</h1>
                                    </div>
                                </div>
                            )})
                    ) : (
                            <div className="col-span-12 flex justify-center">
                                <div className="w-96"><ImageUnavailable/></div>
                            </div>
                        
                    )}
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default VenueSeating;
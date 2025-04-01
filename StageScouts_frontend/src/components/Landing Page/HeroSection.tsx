import { useEffect } from "react";
import HeroImage from "../../assets/hero-image.png"
import Button from "../Common Components/Button";
import { useNavigate } from "react-router-dom";

function HeroSection(){
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        }, []);
        
    return (
        <div className="relative">
            <img src={HeroImage} className=" w-full opacity-100"></img>
            <div className="absolute top-[50%] left-[45%] -translate-[35%] md:top-[45%] md:left-[50%] md:-translate-[40%]">
                <h1 className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold">Discover the Best Views in Town!</h1>
                <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl font-light">Experience the magic of live performances from the best possible seats in the house.</p>
                <br></br>
                <Button title="Explore" buttonType="primary" buttonSize="md" onClick={() => {navigate('/venues')}}/>
            </div>
        </div>
    )
}

export default HeroSection;
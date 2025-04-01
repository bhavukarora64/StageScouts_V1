import Navbar from "../Common Components/Navbar";
import FeatureSection from "./FeatureSection";
import Footer from "../Common Components/Footer";
import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
import WorkingSection from "./WorkingSection";

function LandingPage(){
    return (
    <>
        <Navbar />   
        <HeroSection />
        <FeatureSection />
        <WorkingSection />
        <NewsSection />
        <Footer />
    </>
    )
}

export default LandingPage;
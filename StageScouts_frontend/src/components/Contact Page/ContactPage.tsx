import Navbar from "../Events Page/Navbar";
import Footer from "../Common Components/Footer";
import { useEffect } from "react";
function ContactPage(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
    <>
        <Navbar />  
        <h1 className="text-3xl font-bold my-60 text-center">Our Developers are working on this page. 
            <br></br>Please check back later !</h1> 
        <Footer />
    </>
    )
}

export default ContactPage;
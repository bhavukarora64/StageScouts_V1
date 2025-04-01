import { Eye, Map, Smile } from "lucide-react";
import CEOImage from "../../assets/ceo.png";
import { useEffect } from "react";

const AboutPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        }, []);
        
    return (
        <div className="min-h-screen mt-12 bg-background flex flex-col justify-center  items-center">
            <main className="flex-1 container py-12">
                <h1 className="text-4xl font-bold mb-8 text-center">About Stage Scouts</h1>
                
                <div className="max-w-3xl mx-auto mb-12">
                    <p className="text-xl text-center text-muted-foreground mb-8">
                        Stage Scouts helps concert-goers find the perfect seat by providing 
                        detailed venue information and seat previews.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="text-center p-6 bg-muted/30 rounded-lg border-1 border-gray-300 drop-shadow-sm">
                            <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-bold text-lg">Vision</h3>
                            <p className="text-sm text-muted-foreground">
                                Helping you find the perfect seat with clarity and precision.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-muted/30 rounded-lg border-1 border-gray-300 drop-shadow-sm">
                            <Map className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-bold text-lg">Mapping</h3>
                            <p className="text-sm text-muted-foreground">
                                Comprehensive venue maps to guide your decisions.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-muted/30 rounded-lg border-1 border-gray-300 drop-shadow-sm">
                            <Smile className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-bold text-lg">Experience</h3>
                            <p className="text-sm text-muted-foreground">
                                Ensuring your event experience is unforgettable.
                            </p>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                    <p className="mb-4">
                        Stage Scouts was founded in 2023 by a group of concert enthusiasts who were tired of being 
                        surprised by their seat views. After one too many experiences of obstructed views and 
                        misleading seat descriptions, they decided to create a solution.
                    </p>
                    <p className="mb-4">
                        What started as a small project mapping local venues has grown into a comprehensive 
                        platform covering venues across the country. Our team personally visits venues to take 
                        photos and document the experience from every section.
                    </p>
                    <p>
                        Today, we're proud to help thousands of event-goers make informed decisions about their 
                        ticket purchases, ensuring they get exactly the experience they're paying for.
                    </p>
                </div>
                
                <div className="bg-muted/30 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-center">Meet Our Team</h2>
                        <div className="text-center">
                            <img
                                src={CEOImage}
                                alt="CEO, Founder"
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="font-bold">Bhavuk Arora</h3>
                            <p className="text-sm text-muted-foreground">CEO & Founder</p>
                        </div>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;

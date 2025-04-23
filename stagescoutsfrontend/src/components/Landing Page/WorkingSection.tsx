import NumberOne from "../../assets/NumberOne";
import NumberTwo from "../../assets/NumberTwo";
import NumberThree from "../../assets/NumberThree";



function WorkingSection(){

    const benefits = [
        {
            benefitTitle: "Browse Venues",
            benefitDescription: "Explore our collection of concert halls and stadiums.",
            image: <NumberOne imageProp="xl"/>
        },
        {
            benefitTitle: "Preview Seats",
            benefitDescription: "See the view from different sections before booking.",
            image: <NumberTwo imageProp="xl"/>
        },
        {
            benefitTitle: "Make Your Choice",
            benefitDescription: "Book with confidence knowing exactly what to expect.",
            image: <NumberThree imageProp="xl"/>
        },
    ]

    return (
        <div className="w-full px-18 mb-30 pb-16 pt-5 bg-gray-50">
            <h1 className="text-3xl font-bold my-10 text-center">How It Works</h1>
            <div className="grid grid-cols-12">
                { benefits.map((benefit, index) => (
                    <div key={index} id={index.toString()} className="mx-4 pt-5 mt-7 pb-5 border-1 border-gray-300  bg-white rounded-xl col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4">
                        <div className="flex justify-center mb-10">{benefit.image}</div>
                        <div className="ml-5 mt-5 leading-5 text-center">
                            <h1 className="font-bold text-2xl mb-3">{benefit.benefitTitle}</h1>
                             <p className="text-gray-500"> {benefit.benefitDescription}</p>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}

export default WorkingSection;



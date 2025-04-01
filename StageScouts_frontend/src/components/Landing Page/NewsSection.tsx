import Button from "../Common Components/Button";



function NewsSection(){
    return (
        <div className="w-full px-18 mb-30 pb-16 text-center">
            <h1 className="text-3xl font-bold my-5 text-center">Stay Updated on New Venues/Events</h1>
            <p className="mb-8">Be the first to know when we add new venues or special seating options.</p>
            <div className=" flex flex-col md:flex-row gap-10 md:gap-5 mt-5 justify-center items-center">
                <input placeholder="Enter your email" className="w-80 h-11 border-1 px-3 border-gray-300 rounded-md "></input>
                <Button title="Subscribe" buttonType="primary" buttonSize="md"/>
            </div>
        </div>
    )
}

export default NewsSection;




function Footer(){

    return (
        <div className="w-full bg-gray-50">
            <footer className=" h-78 pt-16 px-10 grid grid-cols-4">
                <div className="col-span-1 flex flex-col">
                    <span className="font-bold pb-3 font-serif text-2xl">Stage Scouts</span>
                    <span className="text-gray-500">Helping concert-goers find the perfect seat since 2023.</span>
                </div>
                <div className="col-span-1 flex flex-col">
                    <span className="font-bold pb-3">Quick Links</span>
                    <div className="text-gray-500 flex flex-col">
                    <span>Home</span>
                    <span>Events</span>
                    <span>About</span>
                    <span>Contact</span>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col">
                    <span className="font-bold pb-3">Legal</span>
                    <div className="text-gray-500 flex flex-col">
                    <span>Term of Services</span>
                    <span>Privacy Policy</span>
                    <span>Cookie Policy</span>
                    </div>
                </div>
                <div className="col-span-1 flex flex-col">
                    <span className="font-bold pb-3">Connect With Us</span>
                    <div className="text-gray-500 flex flex-col">
                        <span>Facebook</span>
                        <span>Twitter</span>
                        <span>Instagram</span>
                    </div>
                </div>
                <hr className="col-span-4 border-1 border-gray-100"></hr>
                <h1 className="col-span-4 text-center text-sm text-gray-500">© 2023 Stage Scouts. All rights reserved.</h1>
            </footer>

        </div>
    )
}

export default Footer;
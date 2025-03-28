import Logo from "../assets/StageScouts_Logo.png"

function Navbar(){
    return (
        <nav className="flex justify-between">
            <img src={Logo}/>
            <div className="flex gap-10 mt-5">
                <span>Home</span>
                <span>Event</span>
                <span>About</span>
                <span>Contact</span>
            </div>
            <div className="flex gap-6">
                <button className="border-2 border-black w-23 h-10 rounded-xl mt-3">Login</button>
                <button className="border-2 border-black w-23 h-10 rounded-xl mt-3">Logout</button>
            </div>
        </nav>
    )
}

export default Navbar;
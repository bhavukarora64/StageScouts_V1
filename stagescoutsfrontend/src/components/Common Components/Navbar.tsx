import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Button from "../Common Components/Button";
import {isLoggedIn as loginState} from "../../assets/store/userAtom";
import { useRecoilState} from "recoil";
import Register from '../../assets/Register';
import { List, LogIn, LogOut } from 'lucide-react';
const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;



function Navbar(){
    const navBarElements = ["Home", "Events", "Venues", "About", "Contact"];
    const navBarElementsList = ["Home", "Events", "Venues", "About", "Contact", "Signup"];
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    addEventListener('scroll', () => {setScrollPosition(window.scrollY)});
    const [listVisible, setListVisible] = useState(false);

    async function userCheck() {
        try {
          const token = localStorage.getItem("Authorization");
          if (!token) {
            console.log("Please Re-login");
            return false;
          }
    
          const response = await fetch(`${backendBaseURL}/me`, {
            method: "GET",
            headers: { "authorization": token }
          });
    
          const userData = await response.json();
          if(userData.error === null && userData.userId){
            setIsLoggedIn(true);
          }else{
            console.log("Please login")
          }
        } catch (error) {
          console.error("Error checking user:", error);
          return false;
        }
      }

      
    useEffect(() => {
        userCheck();
    }, []);

    return (
        <div className="flex w-full flex-column justify-center">
            <nav className= { scrollPosition > 10 ? "fixed justify-between w-full px-6 md:px-10 lg:px-15 xl:px-18 pb-3 flex z-50 bg-white/90" : "fixed justify-between w-full px-6 md:px-10 lg:px-15 xl:px-18 flex z-50"}>
                <Link to={"/"}><h1 className={(scrollPosition > 10 ? "text-black":"text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" ) + " " + "text-lg sm:text-xl md:text-2xl lg:text-3xl  xl:text-4xl mt-2 font-serif"}>Stage Scouts</h1></Link>
                <div className="lg:flex gap-10 mt-4 hidden">
                    {navBarElements.map((element, index) => (
                        <Link key={index} to={"/" + element}>
                            <span id={String(index)} className={(scrollPosition > 10 ? "text-black":"text-white font-bold" ) + " " + "text-xl hover:text-[#0f92c9] transition-all duration-300 cursor-pointer"}>
                                {element}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="gap-6 mt-2 hidden lg:flex">
                <Button onClick={registerUser} title="Register" buttonType="secondary" buttonSize="md" frontIcon={<Register imageProp='md'/>}/>
                {isLoggedIn 
                        ? 
                            (<Button onClick={logoutUser} title="Logout" buttonType="logout" buttonSize="md" frontIcon={<LogOut size={20} />}/> )
                        : 
                            (<Button onClick={loginUser} title="Login" buttonType="primary" buttonSize="md" frontIcon={<LogIn size={20} />}/>)
                    }
                </div>
                <div className=' flex gap-6 mt-2 lg:hidden'>
                    <div onClick={() => setListVisible(!listVisible)} className='cursor-pointer relative'><List size={25} style={{color: scrollPosition > 10 ? "Black" : "white"}}/></div>
                    <div  className={"absolute top-8 right-2 h-auto w-24 flex bg-white drop-shadow-2xl z-70" + (listVisible ? " block" : " hidden")}>
                        <div className='flex flex-col gap-2 mt-2'>
                            {navBarElementsList.map((element, index) => (
                                <Link key={index} to={"/" + element}>
                                    <span id={String(index)} className="text-black text-lg hover:text-[#0f92c9] transition-all duration-300 cursor-pointer bg-white w-24 rounded-md md:py-1 text-center flex items-center justify-center">
                                        {element}
                                    </span>
                                </Link>
                            ))}
                            {
                                isLoggedIn 
                                ?
                                <span onClick={logoutUser} className="text-black text-lg hover:text-[#0f92c9] transition-all duration-300 cursor-pointer bg-white w-24 rounded-md md:py-1 text-center flex items-center justify-center">
                                    Logout
                                </span>
                                :
                                <span onClick={loginUser} className="text-black text-lg hover:text-[#0f92c9] transition-all duration-300 cursor-pointer bg-white w-24 rounded-md md:py-1 text-center flex items-center justify-center">
                                    Login
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )

    function loginUser(){
        navigate('/Login');
    }

    function logoutUser()
    {
        setIsLoggedIn(false);
        localStorage.removeItem('Authorization');
        navigate('/');
    }

    function registerUser(){
        navigate('/Signup');
    }




}

export default Navbar;
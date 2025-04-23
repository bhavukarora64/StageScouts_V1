import { Link, useNavigate} from "react-router-dom";
import Button from "../Common Components/Button";
import Navbar from "../Events Page/Navbar";
import Footer from "../Common Components/Footer";
import Mail from "../../assets/Mail";
import Lock from "../../assets/Lock";
import {useState} from 'react'
import { useRecoilState } from "recoil";
import { isLoggedIn as loginState } from "../../assets/store/userAtom";
const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;




function LoginPage(){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    console.log(isLoggedIn)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function forgotPassword(){
        console.log("Forgot password clicked")
    }

    async function loginUser(){
        const data = await fetch(`${backendBaseURL}/api/auth/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'email': email,
                'password': password
            },

        });

        const response = await data.json();
        const token = response.Authorization;
        localStorage.setItem('Authorization', token);
        setIsLoggedIn(true);
        navigate('/');
    }

    return (
        <><Navbar />
        <div className="w-screen h-screen max-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 h-auto w-full max-w-md p-5 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <p className="text-sm font-light text-center">Enter your credentials to access your account</p>
                <div className="flex flex-col gap-2 mt-5 mx-10">
                    <label>Email</label>
                    <div className="flex border border-gray-300 rounded-md items-center gap-2 px-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <Mail imageProp="lg" />
                        <input 
                            type="email" 
                            placeholder="you@example.com" 
                            className="h-10 w-full rounded-md border-none focus:outline-none focus:ring-0" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <label>Password</label>
                    <div className="flex border border-gray-300 rounded-md items-center gap-2 px-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <Lock imageProp="lg" />
                        <input placeholder="********" type="password" className="border-none h-10 px-1 block w-full focus-within:outline-none focus:ring-0" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="flex justify-end mt-2">
                        <p onClick={forgotPassword} className="text-sm hover:underline hover:cursor-pointer">Forgot password?</p>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-5 gap-2">
                        <Button title="Sign In" buttonType="primary" buttonSize="md-long" onClick={loginUser}/>
                        <Link to="/signup"><p className="text-sm hover:underline hover:cursor-pointer">Don't have an account? <span className="font-medium">Sign up</span></p></Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer /></>
    )
}


export default LoginPage;


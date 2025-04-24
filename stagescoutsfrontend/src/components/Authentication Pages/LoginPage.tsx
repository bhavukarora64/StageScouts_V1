import { Link, useNavigate} from "react-router-dom";
import Button from "../Common Components/Button";
import Navbar from "../Events Page/Navbar";
import Footer from "../Common Components/Footer";
import Mail from "../../assets/Mail";
import Lock from "../../assets/Lock";
import {useRef, useState} from 'react'
import { useRecoilState } from "recoil";
import { isLoggedIn as loginState } from "../../assets/store/userAtom";
const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

function LoginPage(){
    const navigate = useNavigate();
    const [, setIsLoggedIn] = useRecoilState(loginState);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const usernameRef = useRef<string>(null);
    const passwordRef = useRef<string>(null);

    function forgotPassword(){
        console.log("Forgot password clicked")
    }

    async function loginUser(){
        const data = await fetch(`${backendBaseURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })

        });

        const response = await data.json();
        if(response.Authorization){
            const token = response.Authorization;
            localStorage.setItem('Authorization', token);
            setIsLoggedIn(true);
            navigate('/');
        }else{
            console.log(response.error)
            alert(response.error);
        }
    }

    async function testLoginUser(){
        usernameRef.current = "guest@gmail.com";
        passwordRef.current = "Guest@123";

        const data = await fetch(`${backendBaseURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: usernameRef.current,
                password: passwordRef.current
            })

        });

        const response = await data.json();
        if(response.Authorization){
            const token = response.Authorization;
            localStorage.setItem('Authorization', token);
            setIsLoggedIn(true);
            navigate('/');
        }else{
            console.log(response.error)
            alert(response.error);
        }
    }

    return (
        <><Navbar />
        <div className="w-screen h-screen max-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 h-auto w-86 sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-5 rounded-lg shadow-lg">
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
                    <div className="flex justify-center items-center mt-5 gap-2">
                        <Button title="Sign In" buttonType="primary" buttonSize="lg" onClick={loginUser}/>
                        <Button title="Test Login" buttonType="primary" buttonSize="lg" onClick={testLoginUser}/>
                    </div>
                    <Link to="/signup" className="flex justify-center"><p className="text-sm hover:underline hover:cursor-pointer">Don't have an account? <span className="font-medium">Sign up</span></p></Link>
                </div>
            </div>
        </div>
        <Footer /></>
    )
}


export default LoginPage;


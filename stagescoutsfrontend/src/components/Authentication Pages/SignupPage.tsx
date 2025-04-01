import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Common Components/Button";
import Navbar from "../Events Page/Navbar";
import Footer from "../Common Components/Footer";
import Mail from "../../assets/Mail";
import User from "../../assets/User";
import Lock from "../../assets/Lock";

function SignupPage() {
    const [name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function registerUser() {
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return
        }

        const data = await fetch('https://stage-scouts-v1-backend.vercel.app/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const response = await data.json();

        console.log(response)
    }

    return (
        <>
            <Navbar />
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <div className="gap-5 mt-5 h-auto w-auto pb-5 rounded-lg pt-5 shadow-md bg-white">
                    <h1 className="text-2xl font-bold text-center mb-2">Create an Account</h1>
                    <p className="text-sm font-light text-center">Join thousands of venue explorers today</p>
                    <div className="flex flex-col gap-2 mt-5 mx-10">
                        <label>Full Name</label>
                        <div className="flex border border-gray-300 rounded-md items-center gap-2 px-3 focus-within:ring-2 focus-within:ring-blue-500">
                            <User imageProp="lg" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="h-10 w-full rounded-md border-none focus:outline-none focus:ring-0"
                                value={name}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
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
                            <input
                                placeholder="********"
                                type="password"
                                className="border-none h-10 px-1 block w-full focus-within:outline-none focus:ring-0"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <label>Confirm Password</label>
                        <div className="flex border border-gray-300 rounded-md items-center gap-2 px-3 focus-within:ring-2 focus-within:ring-blue-500">
                            <Lock imageProp="lg" />
                            <input
                                placeholder="********"
                                type="password"
                                className="border-none h-10 px-1 block w-full focus-within:outline-none focus:ring-0"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center mt-5 gap-2">
                            <Button title="Sign In" buttonType="primary" buttonSize="md-long" onClick={registerUser} />
                            <Link to="/login"><p className="text-sm hover:underline hover:cursor-pointer">Already have an account? <span className="font-medium">Sign in</span></p></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignupPage;

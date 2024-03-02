import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const {user, logIn} = UserAuth()
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try{
        await logIn(email, password)
        navigate('/users')
    } catch(err){
        console.log(err)
    }
  };
    return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://preview.redd.it/how-can-someone-make-this-background-with-html-and-css-i-v0-zjgs096khv591.jpg?auto=webp&s=9659527da9196c27a8875200b41d20a8e901c341"
        ></img>
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen"/>

        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/70 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-nsans-bold">Login</h1>
              <form onSubmit={handleFormSubmit} className="w-full flex flex-col py-4">
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button className="bg-red-600 hover:bg-red-700 py-3 my-3 rounded font-nsans-bold">
                  Login
                </button>
                <div className="flex justify-between items-center text-gray-600 checked">
                    <p>
                        <input type="checkbox" className="mr-2" checked={rememberLogin} onChange={(e)=>setRememberLogin(!rememberLogin)}></input>
                        Remember me
                    </p>
                    <p>Need help?</p>
                </div>
                <p className="my-4">
                    <span className="text-gray-600 mr-2">New to Notflix?</span>
                    <Link to="/signup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

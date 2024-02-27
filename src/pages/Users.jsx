import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Users = () => {
const { user } = UserAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl md:text-4xl lg:text-5xl text-white font-nsans-light mt-[-200px] md:mt-8 lg:mt-15 text-center">
        Who's watching?
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-9">
        <Link to="/">
          <div className="group flex flex-col items-center w-56 mx-auto md:w-72 lg:w-80">
            <div className="w-40 h-40 rounded-md flex items-center justify-center border-4 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
              <img
                src="https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg"
                alt="New User"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-4 text-gray-400 text-xl md: lg:text-2xl text-center group-hover:text-white font-nsans-light">
            {user.email}
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Users;



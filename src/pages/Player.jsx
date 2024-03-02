import React from "react";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const opts = {
    height: "700",
    width: "100%",
    playerVars: {
        autoplay: 1,
    },
};

const Player = () => {
    return <>
        <div className="flex flex-col items-center justify-center min-h-screen">
        <Link to="/" className="z-99 self-start ml-8 mt-1  text-4xl text-white opacity-90 hover:opacity-100">
                <FaArrowLeft />
            </Link>
        <YouTube className="w-full" videoId="_lf5UfMmCCQ" opts={opts}></YouTube>
        </div>
    </>;
};

export default Player;
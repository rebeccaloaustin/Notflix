import React from "react";
import { createImageUrl } from "../services/movieServices";
import { PiXCircleThin} from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";


const MovieModal = ({ movie, onClose }) => {
    const { title, backdrop_path, poster_path} = movie;
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="bg-zinc-900 rounded-lg overflow-hidden max-w-screen-sm sm:max-w-10/12 md:max-w-5/12 lg:max-w-5/12 md:h-4/5 relative">
                <div className="absolute top-0 right-0 m-2 z-10">
                    <button className="text-white hover:text-gray-300" onClick={onClose}>
                        <PiXCircleThin size={35}/>
                    </button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t top from-zinc-900"></div>
                    <img className="w-full h-full object-cover object-top" style={{ maxHeight: "360px" }} src={createImageUrl(backdrop_path ?? poster_path, "w1280")} alt={title} />
                </div>
                <div className="p-4 flex items-center">
                    <button className="capitalize rounded bg-red-600 text-white font-nsans-regular py-2 px-10 ml-4 mb-2">play</button>
                    <div className="ml-3 mt-[-10px] text-gray-400">
                        <CiCirclePlus size={35} />
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-white mb-1 ml-8 font-nsans-medium">{movie.title}</h2>
                <p className="text-gray-400 text-sm ml-8">Released: {movie.release_date}</p>
                <div className="mt-1 ml-8 text-wrap mb-auto max-w-[90%] font-nsans-light overflow-y-scroll" id="movieOverview">{movie.overview}</div>
            </div>
        </div>
    );
};

export default MovieModal;














import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createImageUrl } from "../services/movieServices";
import { PiXCircleThin } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";



const MovieModal = ({ movie, onClose }) => {
    const [watchLater, setWatchLater] = useState(false);
    const {user} = UserAuth();
  const { title, backdrop_path, poster_path } = movie;
  const genreMapping = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  const movieGenres = movie.genre_ids.map((genreId) => genreMapping[genreId]);

  const addWatchLater = async () => {
    const userEmail = user?.email
    if(userEmail) {
        const userDoc = doc(db, 'users', userEmail)
        setWatchLater(!watchLater)
        await updateDoc(userDoc, {
            watchLater: arrayUnion({...movie})
        })
    } else (err) => {
        console.log(err)
    }
}

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-zinc-900 rounded-lg overflow-hidden max-w-screen-sm sm:max-w-10/12 md:max-w-5/12 lg:max-w-5/12 md:h-4/5 relative overflow-y-scroll">
        <div className="sticky top-0 right-0 z-10">
          <div className="absolute m-2 ml-[92%] mt-4">
            <button
              className="text-white hover:text-gray-300 mt-0"
              onClick={onClose}>
              <PiXCircleThin size={35} />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t top from-zinc-900"></div>
          <img
            className="w-full h-full object-cover object-top"
            style={{ maxHeight: "360px" }}
            src={createImageUrl(backdrop_path ?? poster_path, "w1280")}
            alt={title}
          />
        </div>
        <div className="p-4 flex items-center">
          <Link to="/player">
            <button className="capitalize rounded bg-red-600 hover:bg-red-700 text-white font-nsans-regular py-2 px-10 ml-4 mb-2">
              play
            </button>
          </Link>
          <p onClick={addWatchLater} className="ml-3 mt-[-9px] text-gray-400 hover:text-gray-300">
                    {watchLater ? (
                        <CiCircleCheck 
                            size={35}
                            
                        />
                    ) : (
                        <CiCirclePlus
                            size={35}
                            title="Add to watch later"
                        />
                    )}
                </p>
        </div>
        <h2 className="text-xl font-semibold text-white mb-1 ml-8 font-nsans-bold">
          {movie.title}
        </h2>
        <div
          className="mt-1 ml-8 text-wrap max-w-[90%] font-nsans-light mb-2"
          id="movieOverview"
        >
          {movie.overview}
        </div>
        <p className="text-gray-400 text-sm ml-8 font-nsans-light">
          Released: {movie.release_date}
        </p>
        <p className="text-gray-400 text-sm ml-8 font-nsans-light mb-6">
          Genres: {movieGenres.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;

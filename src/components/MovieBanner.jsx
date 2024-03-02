import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints, { createImageUrl } from "../services/movieServices";
import { Link } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { UserAuth } from "../context/AuthContext";

const MovieBanner = () => {
  const [movie, setMovie] = useState({});
  const {user} = UserAuth();
  const [watchLater, setWatchLater] = useState(false);
  useEffect(() => {
    axios.get(endpoints.popular).then((response) => {
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      setMovie(randomMovie);
    });
  }, []);

  const truncate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  if (!movie)
    return (
      <>
        <p>loading movie...</p>
      </>
    );

  const { title, backdrop_path, release_date, overview } = movie;

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
    <div className="w-full h-[550px] lg:h-[650px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[650px] bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover object-top"
          src={createImageUrl(backdrop_path, "original")}
          alt={title}
        ></img>
        <div className="absolute w-full top-[20%] lg:top-[35%] p-4 md:p-8">
          <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
          <div className="mt-8 mb-4">
            <Link to="/player">
              <button className="capitalize border bg-gray-300 hover:bg-gray-400 hover:border-gray-400 text-black py-2 px-5 ml-4">
                play
              </button>
            </Link>
            <button onClick={addWatchLater} className="capitalize border border-gray-300 hover:border-gray-400 hover:text-gray-300 py-2 px-5 ml-4">
              watch later
            </button>
          </div>
          <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full md:max-w[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncate(overview, 165)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;

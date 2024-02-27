import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [favShows, setFavShows] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const { user } = UserAuth();
  
  useEffect(() => {
    if (user) {
      const grabData = onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.exists()) {
          setFavShows(doc.data().favShows || []);
          setWatchLater(doc.data().watchLater || []);
        }
      });
      
      return () => {
        grabData();
      };
    }
  }, [user?.email]);

  const slide = (sliderId, offset) => {
    const slider = document.getElementById(sliderId);
    slider.scrollLeft += offset;
  };

  const unlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
      watchLater: arrayRemove(movie),
    });
  };
  
  if (!user) {
    return(
        <>
        <p>fetching shows...</p>
        </>
    );
  }
  
  return (
    <>
      <div>
        <div>
          <img
            className="block w-full h-[500px] object-cover"
            src="https://preview.redd.it/how-can-someone-make-this-background-with-html-and-css-i-v0-zjgs096khv591.jpg?auto=webp&s=9659527da9196c27a8875200b41d20a8e901c341"
            alt="//"
          ></img>
          <div className="bg-black/60 absolute top-0 left-0 w-full h-[500px]"></div>
          <div className="absolute top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
              My Shows
            </h1>
            <p className="font-nsans-light text-gray-400 text-lg">
              {user.email}
            </p>
          </div>

          <h2 className="font-nsans-bold md:text-xl p-4 capitalize">
            Favorite Shows
          </h2>
          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide("favShowsSlider", -1000)}
              className="absolute left-2 opacity-80 text-white z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
            <div
              id={`favShowsSlider`}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {favShows.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor- pointer m-2"
                >
                  <img
                    className="w-full h-40 block object-cover object-top"
                    src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                    alt={movie.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                      {movie.title}
                    </p>
                    <p>
                        <AiOutlineClose size={30}
                        onClick={() => unlikeShow(movie)}
                        className="absolute top-2 right-2"
                        />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={() => slide("favShowsSlider", 1000)}
              className="absolute right-2 opacity-80 text-white z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
          </div>
          <h2 className="font-nsans-bold md:text-xl p-4 capitalize">
            Watch Later
          </h2>
          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide("watchLaterSlider", -1000)}
              className="absolute left-2 opacity-80 text-white z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
            <div
              id={`watchLaterSlider`}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {watchLater.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor- pointer m-2"
                >
                  <img
                    className="w-full h-40 block object-cover object-top"
                    src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                    alt={movie.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                      {movie.title}
                    </p>
                    <p>
                        <AiOutlineClose size={30}
                        onClick={() => unlikeShow(movie)}
                        className="absolute top-2 right-2"
                        />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={() => slide("watchLaterSlider", 1000)}
              className="absolute right-2 opacity-80 text-white z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
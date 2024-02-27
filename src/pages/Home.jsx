import React from "react";
import MovieBanner from "../components/MovieBanner";
import MovieRow from "../components/MovieRow";
import endpoints from "../services/movieServices";

const Home = () => {
    return <>
        <MovieBanner />
        <MovieRow title='upcoming' url={endpoints.upcoming}/>
        <MovieRow title='trending' url={endpoints.trending}/>
        <MovieRow title='top rated' url={endpoints.topRated}/>
        <MovieRow title='comedy' url={endpoints.comedy}/>
        <MovieRow title='popular' url={endpoints.popular}/>
    </>;
};

export default Home;
import React from "react";
import MovieBanner from "../components/MovieBanner";
import MovieRow from "../components/MovieRow";
import endpoints from "../services/movieServices";

const Home = () => {
    return <>
        <MovieBanner />
        <MovieRow title='upcoming movies' url={endpoints.upcoming}/>
        <MovieRow title='trending movies' url={endpoints.trending}/>
        <MovieRow title='top rated movies' url={endpoints.topRated}/>
        <MovieRow title='comedy' url={endpoints.comedy}/>
        <MovieRow title='popular on Notflix' url={endpoints.popular}/>
        <MovieRow title='documentaries' url={endpoints.documentary}/>
        <MovieRow title='horror' url={endpoints.horror}/>
        <MovieRow title='drama' url={endpoints.drama}/>
        <MovieRow title='romantic movies' url={endpoints.romance}/>
        <MovieRow title='action movies' url={endpoints.action}/>
        <MovieRow title='animated movies' url={endpoints.animation}/>
        <MovieRow title='romantic comedies' url={endpoints.romanticComedy}/>
    </>;
};

export default Home;
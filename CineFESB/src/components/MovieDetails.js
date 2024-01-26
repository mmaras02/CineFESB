import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import useFetch from "./useFetch";
import MovieDetailsList from "./MovieDetailsList";
import CheckLogin from "./CheckLogin";

const MovieDetails = () => {

    let {cinemaId,movieId}=useParams();
    let {data: movies,error:moviesError,isPending:moviesIsPending}=useFetch('http://localhost:8000/movies/'+ movieId);
    let {data: cinemas,error:cinemasError,isPending:cinemasIsPending}=useFetch('http://localhost:8000/cinemas/'+ cinemaId);


    return (
        <div className="MovieDetails">
            <Navbar />
            <CheckLogin />

            {(moviesIsPending || cinemasIsPending) && <p>Loading...</p>}
            {(moviesError || cinemasError) && <p>{moviesError}</p> && <p>{cinemasError}</p>}
            {(movies && cinemas) && <MovieDetailsList movies={movies} cinemas={cinemas}/>}
            
            
        </div>
    );
}
 
export default MovieDetails;
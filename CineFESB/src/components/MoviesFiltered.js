import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import MoviesList from "./MoviesList";
import Navbar from "./Navbar";
import CheckLogin from "./CheckLogin";

const MoviesFiltered = () => {
    const {cinemaId}=useParams();
    const {movieGenre}=useParams();

    let {data:movies,isPending:moviesIsPending,error:moviesError}=useFetch('http://localhost:8000/movies'); 
    let {data:cinemas,isPending:cinemasIsPending,error:cinemasError}=useFetch('http://localhost:8000/cinemas/' + cinemaId);
    
    if(movies){
        movies=movies.filter(movie=>{
            if(movie.cinemaId.includes(cinemaId))
                return movie.movieGenre.includes(movieGenre);
            return null;
        });
    }

    return (
        <div className="MoviesFiltered">

            <CheckLogin />

            {(moviesError || cinemasError) && <p>{moviesError}</p> && <p>{cinemasError}</p>}
            {(moviesIsPending || cinemasIsPending) && <p>Loading...</p>}
            {(movies && cinemas) && <Navbar movies={movies} cinemaId={cinemaId} />}
            {(movies && cinemas) && <h2>Movies in {cinemas.cinemaName}</h2>}
            {(movies && cinemas) && <h2>Genre: {movieGenre}</h2>}
            {(movies && cinemas) && <MoviesList movies={movies} cinemaId={cinemaId} />}
        </div>
    );
}
 
export default MoviesFiltered;
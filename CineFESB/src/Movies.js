import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import MoviesList from "./MoviesList";
import NavbarWithFilter from "./NavbarWithFilter";
import CheckLogin from "./CheckLogin";

const Movies = () => {
    let {cinemaId}=useParams();

    let {data:movies,isPending:moviesIsPending,error:moviesError}=useFetch('http://localhost:8000/movies'); 
    let {data:cinemas,isPending:cinemasIsPending,error:cinemasError}=useFetch('http://localhost:8000/cinemas/' + cinemaId);
    
    if(movies){
        movies=movies.filter(movie=>{
            return movie.cinemaId.includes(cinemaId);
        });
    }

    

    return (
        <div className="Movies">

            <CheckLogin />

            {(moviesError || cinemasError) && <p>{moviesError}</p> && <p>{cinemasError}</p>}
            {(moviesIsPending || cinemasIsPending) && <p>Loading...</p>}
            {(movies && cinemas) && <NavbarWithFilter movies={movies} cinemaId={cinemaId} />}
            {(movies && cinemas) && <h2>Movies in {cinemas.cinemaName}</h2>}
            {(movies && cinemas) && <MoviesList movies={movies} cinemaId={cinemaId} />}
        </div>
    );
}
 
export default Movies;
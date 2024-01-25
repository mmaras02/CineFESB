import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";

const NavbarWithFilter = ({movies,cinemaId}) => {

    const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isFilterOpen,setIsFilterOpen]=useState(false);

    /*SAMO ZA PROBU */
    const genres = ["Comedy", "Action", "Adventure", "Horror", "Thriller", "Drama", "Romance", "Musical", "Animation", "Fantasy"];
    /*const [selectedGenres, setSelectedGenres] = useState([]);*/


    const [selectedGenres, setSelectedGenres] = useState([]);//keep track of selected ones
    const [filteredMovies, setFilteredMovies] = useState([]);

   useEffect(() => {
        console.log("updateted list:",filteredMovies);
    }, [filteredMovies]);

    const handleGenreToggle=(genre)=>{
        setSelectedGenres((prevSelectedGenres)=>{
            if(prevSelectedGenres.includes(genre)){
                return prevSelectedGenres.filter((selectedGenres)=>selectedGenres!==genre);
            }
            else{
                return [...prevSelectedGenres,genre];
            }
        });
    };
    const handleApplyFilter = async () => {
        filterByGenre(selectedGenres);
        await new Promise((resolve) => setTimeout(resolve, 0));
        //navigate(`/movies/${cinemaId}/filtered`, { state: { filteredMovies } });
    };


    /*Ovo je sad origigii */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const closeFilter=()=>{
        setIsFilterOpen(false);
    }
//selectedGenres su kliknuti th oznaceni zanrovi
//filteredMovies su svi filmovi koji sadrze neki od tih zanreva
    const filterByGenre=(selectedGenres)=>{
        if(movies)
        {
            const filtered=movies.filter((movie)=>{
                const movieGenre=movie.movieGenre.split(" / "); //filtered-->all movies genres divided

                console.log("Selected Genres:", selectedGenres);
                console.log("Movie Genres:", movieGenre);

            return selectedGenres.some((selected)=>movieGenre.includes(selected));
            });
            //now i need to go all through filtered and the ones that have any of the selected genres add to the filteredMovies
            console.log("Filtered Movies:", filtered);
            setFilteredMovies(filtered);
            //navigate(`/movies/${cinemaId}/filtered`, { state: {filteredMovies: filteredMovies } });

            //console.log("Updated Filtered Movies:", filteredMovies);
            //<MoviesList movies={filteredMovies} cinemaId={cinemaId}/>
        }
    }

    /*const filterByGenre=(clickedGenre)=>{
        if(movies){
            navigate(`/movies/${cinemaId}/genre/${clickedGenre}`);
        }
    }*/

    return (
        <div className={`Navbar ${isOpen ? 'open' : ''}`}>
            <div className="LeftSideNavBar">
                <FontAwesomeIcon icon={faArrowLeft} onClick={()=>navigate(-1)}/>
                <Link to ="/home">
                    <FontAwesomeIcon icon={faHouse} />
                </Link>
            </div>

            <div className="Hamburger">
                <FontAwesomeIcon icon={faFilter} onClick={toggleFilter}/>
                <FontAwesomeIcon icon={faBars} onClick={toggleMenu}/>
            </div>

            {/*ovo je samo proba */}

            <div className={`overlay1 ${isOpen ? 'open' : ''}`}>
                <a className="close-btn" onClick={closeMenu}><FontAwesomeIcon icon={faTimes} /></a>

                <div className="menu-items">
                    <Link to="/profile">Profile</Link>
                    <Link to="/">Contact</Link>
                    <Link>Special offers</Link>
                    <Link>Calendar</Link>
                    <Link to="/">Logout</Link>
                </div>
            </div>

            <div className={`overlay1 ${isFilterOpen ? 'open' : ''}`}>
                <a className="close-btn" onClick={closeFilter}><FontAwesomeIcon icon={faTimes} /></a>

                <div className="filter-genre">
                    <p>Filter by genre:</p>
                    <div className="button-genre">
                    {genres.map((genre) => (
                        <button key={genre} className={selectedGenres.includes(genre) ? "selected" : ""}
                            onClick={() => handleGenreToggle(genre)}>{genre}</button>))}
                        {/*<button onClick={()=>filterByGenre("Comedy")}>Comedy</button>
                        <button onClick={()=>filterByGenre("Action")}>Action</button>
                        <button onClick={()=>filterByGenre("Adventure")}>Adventure</button>
                        <button onClick={()=>filterByGenre("Adventure")}>Horror</button>
                        <button onClick={()=>filterByGenre("Adventure")}>Romance</button>
                        <button onClick={()=>filterByGenre("Adventure")}>Musical</button>
                    <button onClick={()=>filterByGenre("Adventure")}>Thriller</button>*/}
                    </div>
                <button id="one" onClick={handleApplyFilter}>Apply Filter</button>
                {filteredMovies && (<MoviesList movies={filteredMovies} cinemaId={cinemaId} />)}
                </div>
            </div>
        </div>
    );
}
export default NavbarWithFilter;
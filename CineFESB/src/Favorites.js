import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faHeart } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Favorites = () => {
    const navigate=useNavigate();
    const userId = localStorage.getItem('user');
    const { data: userData, isPending, error } = useFetch(`http://localhost:8000/accounts/${userId}`);
    const [userFavorites, setUserFavorites]=useState([]);
    const {data:movies}=useFetch('http://localhost:8000/movies');

    const handleRemoveFavorite = async (e, movieId) => {
        e.preventDefault();

        try{
            const updatedFavorites=userFavorites.filter(fav=>fav!==movieId);

            const response = await axios.put(`http://localhost:8000/accounts/${userId}`, {
            ...userData,
            favorites: updatedFavorites,
        });
        console.log('Update successful:', response);
        setUserFavorites(updatedFavorites);
        
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
    if(userData && userData.favorites){
        setUserFavorites(userData.favorites);
        console.log(userFavorites);
    }
    else{
        console.log("error!!");
    }
 }, [userData, userFavorites]);

    /*if (movies) {
        return movies.filter(movie=>userFavorites.includes(movie.id));
    }*/
            /*const filteredMovies = movies.filter(movie => userFavorites.includes(movie.id));
            setUserFavorites(filteredMovies);*/
    /*userFavorites.map(favoriteId => {
    const movie = movies.find(movie => movie.id === favoriteId); ovo ide doli:{/*} {movies.map(movie =>*/
    return (
        <div className="Favorites"> 
        <Navbar />
        <div className="favorites-list">
            {movies?.filter((movie) => userFavorites.includes(movie.id)).map((movie) => <div className="favorite-container" key={movie.id}>
                <img src={movie.imageCover} />
                <div className="content-info">
                    <div className="title-container">
                        <h3 key={movie.id}>{movie.movieName}</h3>
                        <p>{movie.movieGenre}</p>
                    </div>
                    <div className="icons-container">
                        <FontAwesomeIcon icon={faHeart} onClick={(e)=>handleRemoveFavorite(e,movie.id)}/>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </div>
            </div>
            )}


        </div>
        </div>
     );
}
 
export default Favorites;
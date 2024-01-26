import { Link } from "react-router-dom";
import { faClock, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";
import useFetch from "./useFetch";
import { useEffect } from "react";
import axios from 'axios';



const MoviesList = ({movies,cinemaId}) => {
    const userId = localStorage.getItem('user');
    const [userData, setUserData] = useState({});
    const [likedMovies, setLikedMovies] = useState(JSON.parse(localStorage.getItem('likedMovies')) || {});

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/accounts/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };
        fetchData();
    }, [userId]);

    const handleHeartToggle = async (e, movieId) => {
        e.stopPropagation();
        e.preventDefault();

        setLikedMovies((prevLikedMovies) => {
        const updatedMovies = { ...prevLikedMovies };
        updatedMovies[movieId] = !prevLikedMovies[movieId];
        localStorage.setItem('likedMovies', JSON.stringify(updatedMovies));
        return updatedMovies;
        });

        if (userData && userData.favorites) {
        const updatedFavorites = likedMovies[movieId]
            ? userData.favorites.filter((fav) => fav !== movieId)
            : [...userData.favorites, movieId];

        const updatedUser = {
            ...userData,
            favorites: updatedFavorites,
        };

        try {
            const response = await axios.put(`http://localhost:8000/accounts/${userId}`, updatedUser);
            console.log('Update successful:', response);
            setUserData(response.data);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }
  };

    return (
        <Swiper
        spaceBetween={10}
        loop
        autoplay={{ delay: 1000, pauseOnMouseEnter: true }}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
        }}
        pagination={{ clickable: true }}
        className="MoviesList">
            {movies.map((movie)=>(
                <SwiperSlide key={movie.id}>
                    <Link to = {`/movies/${cinemaId}/${movie.id}`} className="LinkCard">
                        <div className="card" >
                            <div className="card-image">
                                <img className="original" src={movie.image} alt=""/>
                                <FontAwesomeIcon className={`heart-icon ${likedMovies[movie.id] ? 'liked' : ''}`} icon={faHeart} onClick={(e)=>handleHeartToggle(e, movie.id)}/>
                            </div>
                            <div className="card-content">
                                <h3>{movie.movieName}</h3>
                                <p>{movie.movieGenre}</p>
                                <p id="time"><FontAwesomeIcon icon={faClock} />  : {movie.duration}</p>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
            </Swiper>
    );
}
export default MoviesList;
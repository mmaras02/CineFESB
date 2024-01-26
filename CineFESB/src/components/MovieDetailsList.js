import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import WriteReview from "./WriteReview";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import ReserveTickets from "./ReserveTickets";

const MovieDetailsList = ({movies,cinemas}) => {
    const {data:accounts}=useFetch('http://localhost:8000/accounts');
    const [review, setRewiew] = useState(false);
    const [allReviews,setAllReviewa]= useState(false);
    const [reviewsToDisplay,setReviewsToDisplay]=useState([]);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    const toggleReviewForm = () => {
        setIsReviewFormOpen(!isReviewFormOpen);
      };
    
      const handleReviewSubmit = (newReview) => {
        allReviews(true); 
        setIsReviewFormOpen(false);
      };

    useEffect(()=>{
        setReviewsToDisplay(allReviews? movies.review:movies.review.slice(0,2));    
    },[movies.review,allReviews]);

    const getUserName=(userId)=>{
        const user=accounts.find((user)=>user.id===userId);
        console.log(user.email);
        return user ? user.email : '';
    }

    const toggleReview = (e) => {
        setRewiew(!review);
      };

    const toggleShowAllReviews=()=>{
        setAllReviewa(!allReviews);
    }
     

    return (
        <div className="MovieDetailsList">
            <img src={movies.imageCover} alt="" />
            <h2>{movies.movieName}</h2>
            <p className="Rating"><FontAwesomeIcon icon={faStar} />{ movies.rating}</p>
            <div className="genre-container">
                <p className="genre" >{movies.movieGenre}</p>
            </div>
            <p id="subtitle">Storyline<br /></p>
            <p>{movies.synopsis}</p>
            <p className="info"><span className="titles">Director: </span> {movies.director}</p>
            <p className="info"><span className="titles">Actors: </span> {movies.actors}</p>
            <p className="info"><span className="titles">Cinema: </span> {cinemas.cinemaName}</p>

            {/*movie review with the person who wrote it */}
            <h4 id="review-title">See what other thought about this movie!</h4>
            {movies.review.length===0 ?
             (<p>No reviews yet! Be the first to leave a review</p>):
             (accounts && reviewsToDisplay.map((review,index)=>
            <div key={index} className="rewiev-containers">
                <div className="review-header">
                    <img id="user-picture" src="/images/user2.png"></img>
                    <p id="review-user" key={index}>{getUserName(review.userId)}</p>
                </div>
                <p id="reviw-text">{review.text}</p>
            </div>))}
            
            {movies.review.length>2 && (
                <p onClick={toggleShowAllReviews} id="show-more">
                {allReviews ? "Show Less" : "Show More"}
              </p>
            )}

            <button onClick={toggleReview} className="open-review">Write a review</button>
            {review &&(
                <div className="review-container">
                    <div onClick={toggleReview} className="overlay2">
                        <button className="close-review" onClick={toggleReview}>CLOSE</button>
                        <WriteReview />
                    </div>
                            
                </div>)}

                
            <div className="TicketButtons">
                <Link>Buy tickets</Link>
                <Link to="/movies/:cinemaId/reservation">Reserve tickets</Link>
            </div>
            
        </div>
    );
}

export default MovieDetailsList;
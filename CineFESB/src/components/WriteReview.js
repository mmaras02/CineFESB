import { useState, useEffect } from "react";
import axios from "axios";

const WriteReview = ({ onCancel, onSubmit, movieId }) => {
  const [text, setText] = useState("");
  const userId = localStorage.getItem('user');
  const [movieData, setMovieData] = useState({});
  //const {data:movie}=useFetch('http://localhost:8000/movies');

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movies/${movieId}`);
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [movieId]);


  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!movieData) {
      console.error('Movie data not available');
      return;
    }
    try{
      const updatedReviews = [
        ...movieData.review,
        { userId: parseInt(userId), text }
      ];

      const updatedMovieData = {
        ...movieData,
        review: updatedReviews
      };

    const response = await axios.put(`http://localhost:8000/movies/${movieData.id}`, updatedMovieData);
      console.log('Update successful:', response);
    }
    catch(error)
    {
      console.log(error);
    }

    onSubmit({ userId,text });
  };
  const stopPropagation = (e) => {
    e.stopPropagation();
  };


  return (
    <div className="write-review-form" onClick={stopPropagation}>
      <form>
        <label>Your rewiev</label>
        <textarea required value={text} onChange={handleTextChange}></textarea>
      </form>
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default WriteReview;

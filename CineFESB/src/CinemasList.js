import { Link } from "react-router-dom";

const CinemasList = ({cinemas}) => {

    return (
        <div className="CinemasList">
            {cinemas.map((cinema)=>(
                <div className="cinemaPreview" key={cinema.id} style={{ backgroundImage: `url(${cinema.image})`}}>
                    <Link to = {`/movies/${cinema.id}`}>
                    <div className="overlay">
                        <h3>{cinema.cinemaName}</h3>
                        <div className="cinemaFooter">
                            <p>City: {cinema.cinemaCity}</p>
                            <p>Address: {cinema.cinemaAddress}</p>
                        </div>
                    </div>
                    </Link>
                </div>
            ))}
        </div>
            );
              
}
 
export default CinemasList;
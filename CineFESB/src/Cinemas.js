import CinemasList from "./CinemasList";
import useFetch from "./useFetch";
import Navbar from "./Navbar";
import CheckLogin from "./CheckLogin";

const Cinemas = () => {

    let {data:cinemas,isPending,error}=useFetch('http://localhost:8000/cinemas'); 

    return (
        <div className="Cinemas">
            <Navbar />
            <CheckLogin />

            <h2>CineFESB Cinemas</h2>

            {error && <p>{error}</p>}
            {isPending && <p>Loading...</p>}
            {cinemas && <CinemasList cinemas={cinemas} />}
        </div>
    );
}
 
export default Cinemas;
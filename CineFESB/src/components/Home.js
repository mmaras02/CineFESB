import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import CheckLogin from "./CheckLogin";

const Home = () => {

    return (
        <div className="Home">
            <Navbar />
            <CheckLogin />

            <h1>Welcome to <br/>CineFESB</h1>

            <Link to="/cinemas">
                <button>See cinemas</button>
            </Link>
        </div>
    );
}
 
export default Home;
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate=useNavigate();

    const handleHomeClick=()=>{
        navigate('/');
    }

    return (
        <div className="NotFound">
            <h2>Woopsie!</h2>
            <p>Page you tried to access does not exist.</p>
            <button onClick={()=>handleHomeClick()}>Home</button>
        </div>
    );
}
 
export default NotFound;
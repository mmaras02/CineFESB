import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckLogin = () => {

    const navigate=useNavigate();

    useEffect(()=>{
        if(!localStorage.user){
            alert("You are not logged in.");
            navigate("/");
        }
            
    },[]);

    return (
        <div className="CheckLogin"></div>
    );
}
 
export default CheckLogin;
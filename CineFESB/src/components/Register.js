import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');
    let [confirmPassword,setConfirmPassword]=useState('');
    let [admin,setAdmin]=useState(false);
    let [favorites,setFavorites]=useState([]);
    let [isPending,setIsPending]=useState(false);
    let navigate=useNavigate();

    const handleSubmit=(e)=>{

        e.preventDefault();

        if(password===confirmPassword){
            let userData={email,password,admin,favorites};

            setIsPending(true);

            fetch('http://localhost:8000/accounts',{
                method:'POST',
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(userData)
            }).then(()=>{
                setIsPending(false);
                alert("Account successfuly created!");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setAdmin(false);
                setFavorites([]);
                navigate("/");
            })
        }
        else{
            alert("Try again.");
            setPassword("");
            setConfirmPassword("");
        }
        
    }

    const handleKeyDown = event => {
        if(event.key==='Enter')
            handleSubmit(event);
      };

    return (
        <div className="Login">

            <form className="LoginForm" onSubmit={handleSubmit}>
                <h2>Registration</h2>
                <label>Email:</label>
                <input type="text" className="form-box" placeholder="Email/Username" value={email} onChange={(e)=>setEmail(e.target.value)} onKeyDown={handleKeyDown}/>
                <label>Password:</label>
                <input type="password" className="form-box" placeholder="New password" value={password} onChange={(e)=>setPassword(e.target.value)} onKeyDown={handleKeyDown} />
                <label htmlFor="RegisterPasswordConfirm">Confirm Password:</label>
                <input type="password" className="form-box" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown} />
                
                {isPending && <button disabled className="RegisterButton">Creating...</button>}
                {!isPending && <button className="RegisterButton" >Register</button>}
                <Link to="/">Already have an accout? Login here!</Link>
            </form>
        </div>
    );
}
 
export default Register;
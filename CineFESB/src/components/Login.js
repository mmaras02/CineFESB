import { Link, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect } from "react";

const Login = () => {

    let attempt=3;
    let navigate = useNavigate();
    let userData=useFetch('http://localhost:8000/accounts');
    
    const handleClickLogin = () => {
        let email=document.getElementById("LoginEmail");
        let password=document.getElementById("LoginPassword");
        let user=null;

        if(userData){
            user=userData.data.filter((userD) => {return userD.email===email.value;});
            user=user[0];
            
            if(user)
            {
                
                if(user.password===password.value){
                    email.value="";
                    password.value="";
                    localStorage.setItem('user', user.id);
                    console.log(user.id);
                    console.log(localStorage);
                    alert("Login successful.");
                    navigate("./home");
                }
                else{
                    attempt--;
                    alert("You have " + attempt + " attempts left.");
                    password.value="";
                    if(attempt===0){
                        document.getElementById("LoginEmail").disabled=true;
                        document.getElementById("LoginPassword").disabled=true;
                        document.getElementById("LoginButton").disabled=true;
                        email.value="";
                    }
                }
            }
            else{
                attempt--;
                alert("You have " + attempt + " attempts left.");
                password.value="";
                if(attempt===0){
                    document.getElementById("LoginEmail").disabled=true;
                    document.getElementById("LoginPassword").disabled=true;
                    document.getElementById("LoginButton").disabled=true;
                    email.value="";
                }
            }
        }
    }
    
    const handleKeyDown = event => {
        if(event.key==='Enter')
            handleClickLogin();
      };

    useEffect(()=>{
        localStorage.removeItem("user");
        console.log(localStorage);
    },[]);
   

    return (
        <div className="Login">

            <div className="LoginForm">
                <h2>Login</h2>
                <label htmlFor="LoginEmail">Email:</label>
                <input type="text" id="LoginEmail" className="form-box" placeholder="Email/Username" onKeyDown={handleKeyDown}/>
                <label htmlFor="LoginPassword">Password:</label>
                <input type="password" id="LoginPassword" className="form-box" placeholder="Password" onKeyDown={handleKeyDown} />
                <div className="button-form">
                    <button id="LoginButton"  onClick={()=>handleClickLogin()}>Log in</button>
                    <Link to="./register">Don't have an account? Click here!</Link>
                </div>
                
            </div>
        </div>
    );
}
 
export default Login;

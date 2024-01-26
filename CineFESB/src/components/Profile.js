import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare, faUserGroup, faSheetPlastic, faCreditCard, faGear } from "@fortawesome/free-solid-svg-icons";
import Favorites from "./Favorites";

const Profile = () => {

  const navigate=useNavigate();
  const [username, setUsername]=useState("");
  const userId = localStorage.getItem('user');
  const { data: userData, isPending, error } = useFetch(`http://localhost:8000/accounts/${userId}`);
  const [showFavorites, setShowFavorites] = useState(false); 


  useEffect(() => {
    if(userData && userData.email)
    {
      setUsername(userData.email.split('@')[0]);
    }
    else{
      console.log("error");
    }
  }, [userData,username]);

  if(showFavorites && <Favorites />){
    return <Favorites />
  }

    const handleDeleteAccount = async () => {
        try {
          const accountId = localStorage.getItem('user');
          // Delete the account
          await fetch(`http://localhost:8000/accounts/${accountId}`, {
            method: 'DELETE',
          });
          // Optional: Update the UI or perform any other necessary actions
          localStorage.removeItem('user');
          alert("Account successfully deleted.");
          navigate("/");
      
        } catch (error) {
          console.error('Failed to delete account:', error);
        }
      };
      
  return (
    <div className="Profile">
      <Navbar />
      {/*<Favorites />*/}

      <h2>Profile</h2>
      <div className="profile-data">
        <div className="user-info">
            <img className="profile-img" src="/images/user2.png"></img>
            <p>{username}</p>
        </div>
        <div className="user-content">
          <div className="user-choice">
            <p><FontAwesomeIcon icon={faPenToSquare}/>Edit profile</p>
          </div>
          <Link to={"/favorites"} className="user-choice">
            <p><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>Favorites</p>
          </Link>
          <div className="user-choice">
            <p><FontAwesomeIcon icon={faUserGroup} />Friend list</p>
          </div>
          <div className="user-choice">
            <p><FontAwesomeIcon icon={faSheetPlastic} />Reviews</p>
          </div>
          <div className="user-choice">
            <p><FontAwesomeIcon icon={faCreditCard} />Reservations and payments</p>
          </div>
          <div className="user-choice">
            <p><FontAwesomeIcon icon={faGear} />Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

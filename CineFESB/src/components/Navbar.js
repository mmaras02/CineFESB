import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const Navbar = () => {

    const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className={`Navbar ${isOpen ? 'open' : ''}`}>
            <div className="LeftSideNavBar">
                <FontAwesomeIcon icon={faArrowLeft} onClick={()=>navigate(-1)}/>
                <Link to ="/home">
                    <FontAwesomeIcon icon={faHouse} />
                </Link>
            </div>

            <div className="Hamburger">
                <FontAwesomeIcon icon={faBars} onClick={toggleMenu}/>
            </div>

            <div className={`overlay1 ${isOpen ? 'open' : ''}`}>
                <a className="close-btn" onClick={closeMenu}><FontAwesomeIcon icon={faTimes} /></a>

                <div className="menu-items">
                    <Link to="/profile">Profile</Link>
                    <Link>Contacts</Link>
                    <Link>Special offers</Link>
                    <Link>Calendar</Link>
                    <Link to="/">Logout</Link>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;
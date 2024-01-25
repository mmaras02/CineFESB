import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { Link, useNavigate } from "react-router-dom";


const Screen = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const seats = Array.from({ length: 8 * 8 }, (_, i) => i)


    function handleSelectedSeat(seat){
        const isSelected=selectedSeats.includes(seat);
        if(isSelected)
        {
            selectedSeats.filter(selectedSeat=>selectedSeat!==seat);
        }
    }

    return ( 
    <div className="screen-container">
        <div className="screen" />
        <div className="seats">
            <p>helo</p>
            {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat)
          
          
        })}
        </div>

    </div> );
}
 
export default Screen;
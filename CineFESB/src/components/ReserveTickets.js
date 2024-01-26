import React, { useState } from 'react'
import Navbar from "./Navbar";
import clsx from 'clsx'

const movies = [
    {
      occupied: [20, 21, 30, 1, 2, 8, 35],
    },
]
const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

export default function ReserveTickets() {
    //const { data: movies } = useFetch('http://localhost:8000/movies');
    const [selectedMovie, setSelectedMovie] = useState(movies[0])
    const [selectedSeats, setSelectedSeats] = useState([])

    function handleClick(){
        const updatedMovie = {
            ...selectedMovie,
            occupied: [...selectedMovie.occupied, ...selectedSeats]
        };

        setSelectedMovie(updatedMovie);
        setSelectedSeats([]);
        
        alert("You have sucessfuly reserved your seats!");

    }

    return (
        <div className="App1">
            <Navbar />
            <ShowCase />
            <Cinema1 movie={selectedMovie} selectedSeats={selectedSeats}
                onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)} />

            <p className="info">
                You have selected <span className="count">{selectedSeats.length}</span>{' '}
                seats for the price of{' '}
                <span className="total">
                {selectedSeats.length * 8}$
                </span>
            </p>
            <button id="reserve-button" onClick={handleClick}>RESERVE</button>
        </div>
    )
}

function ShowCase() {

    return (
        <ul className="ShowCase">
        <li>
            <span className="seat" /> <small>Available</small>
        </li>
        <li>
            <span className="seat selected" /> <small>Selected</small>
        </li>
        <li>
            <span className="seat occupied" /> <small>Occupied</small>
        </li>
        </ul>
    )
}

function Cinema1({ movie, selectedSeats, onSelectedSeatsChange }) {

    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(selectedSeats.filter(selectedSeat => selectedSeat !== seat))
        }
        else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

  return (
    <div className="Cinema1">
      <div className="screen" />

      <div className="seats">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = movie.occupied.includes(seat)
          return (
            <span tabIndex="0" key={seat} className={clsx(
                'seat',
                isSelected && 'selected',
                isOccupied && 'occupied',
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={isOccupied ? null : e => {
                      if (e.key === 'Enter') {
                        handleSelectedState(seat)
                      }
                    }
              }
            />
          )
        })}
      </div>
    </div>
  )
}

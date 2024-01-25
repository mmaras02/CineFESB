import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Home";
import Cinemas from "./Cinemas";
import Movies from "./Movies";
import MovieDetails from "./MovieDetails";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./NotFound";
import React from 'react';
import MoviesFiltered from "./MoviesFiltered";
import Profile from "./Profile";
import Favorites from "./Favorites";
import ReserveTickets from "./ReserveTickets";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route exact path="/cinemas" element={<Cinemas />}></Route>
          <Route exact path="/movies/:cinemaId" element={<Movies />}></Route>
          <Route exact path="/movies/:cinemaId/:movieId" element={<MovieDetails />}></Route>
          <Route exact path="/movies/:cinemaId/reservation" element={<ReserveTickets />}></Route>
          <Route exact path="/movies/:cinemaId/genre/:movieGenre" element={<MoviesFiltered />}></Route>
          <Route path = "*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


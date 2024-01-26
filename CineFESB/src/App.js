import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Cinemas from "./components/Cinemas";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import React from 'react';
import MoviesFiltered from "./components/MoviesFiltered";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";
import ReserveTickets from "./components/ReserveTickets";


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


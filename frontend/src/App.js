import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SeatPlan from './components/SeatPlan';  // Import the SeatPlan component
import BookingSuccessPage from './pages/BookingSuccessPage';  // Correct import path for BookingSuccessPage
import { isLoggedIn, login, logout } from './utils/Auth';

function App() {
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [cinemaHallId, setCinemaHallId] = useState(1);  // Default cinema hall ID

  useEffect(() => {
    const loggedInUser = isLoggedIn();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchText(searchQuery);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    login(userData);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar
          user={user}
          onSearch={handleSearch}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path='/'
            element={<Home searchText={searchText} user={user} />}
          />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route
            path='/seat-plan'
            element={
              <div>
                <h1>Choose Your Seats</h1>
                <input
                  type="number"
                  value={cinemaHallId}
                  onChange={(e) => setCinemaHallId(e.target.value)}
                  placeholder="Enter Cinema Hall ID"
                />
                <SeatPlan cinemaHallId={cinemaHallId} />
              </div>
            }
          />
          <Route
            path='/booking-success'
            element={
              <BookingSuccessPage
                selectedMovieId={123}  // Example props (replace with actual dynamic data)
                selectedSessionId={456}
                selectedSeats={['A1', 'A2']}
                user={user}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

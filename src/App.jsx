import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/SignUp';
import Login from './pages/Login';
import TermsOfService from './pages/TermsOfServices';
import AllDrivers from './pages/admin/AllDrivers';
import Profile from './pages/driver/Profile';
import AllUsers from './pages/admin/AllUsers';
import AllBookings from './pages/admin/AllBookings';
import BookCar from './pages/user/BookCar';
import UserProfile from './pages/user/UserProfile';
import Queries from './pages/user/Queries';
import DriverBookings from './pages/driver/DriverBookings';
import AllQueries from './pages/admin/AllQueries';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms-of-services" element={<TermsOfService />} />

          {/* ADMIN Routes */}
          <Route path="/allDrivers" element={<AllDrivers />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/allBookings" element={<AllBookings />} />
          <Route path="/queries" element={<AllQueries />} />

          {/* DRIVER ROUTES */}
          <Route path="/driver/profile" element={<Profile />} />
          <Route path="/driver/bookings" element={<DriverBookings />} />

          {/* USER ROUTES */}
          <Route path="/user/bookings" element={<BookCar />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/queries" element={<Queries />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

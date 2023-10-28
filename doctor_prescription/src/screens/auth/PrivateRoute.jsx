import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function PrivateRoute() {
  const [cookies] = useCookies([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentURL = window.location.origin; // Get the current URL
    const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

    axios
      .get(`${serverAddress}/users/usercheck`)
      .then((response) => {
        setLoading(false); // Set loading to false when data is available
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const isAuthenticated = cookies.jwt;

  if (loading) {
    // Render a loading indicator while waiting for data
    return <p>Loading...</p>;
  }

  if (userData.expireDate) {
    const expireDate = new Date(userData.expireDate);
    if (expireDate < new Date()) {
      // Token has expired, redirect to /enterserial
      return <Navigate to="/enterserial" />;
    }
  }

  if (isAuthenticated) {
    // Token is valid, render the Outlet
    return <Outlet />;
  } else {
    // User is not authenticated, redirect to /login
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function PrivateRoute() {
  const [cookies] = useCookies([]);
  const [userAvailable, setUserAvailable] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/users/usercheck`
      )
      .then((response) => {
        setUserAvailable(response.data); // Update the categories state with the fetched data
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  });
  console.log(userAvailable)
  const isAuthenticated = cookies.jwt;
  
  return userAvailable ? (isAuthenticated ? <Outlet /> : <Navigate to="/login" />) : <Navigate to="/newcomputer" />
}

export default PrivateRoute;

import { Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import FaieldEdit from "./FaieldEdit";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { IconButton } from "@mui/material";
import BackGroundShadow from "../pageCompond/BackGroundShadow";

function DoctorProfile() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [cookies, removeCookie] = useCookies([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormTarget, setEditFormTarget] = useState("");
  const [doctor, setDoctorData] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await axios.post(
        "http://localhost:5000/users",
        {},
        {
          withCredentials: true,
        }
      );
      if (!data.status) {
        removeCookie("jwt");
        Navigate("/login");
      } else setCurrentUser(data);
      axios
        .get(`http://localhost:5000/users/getone/${data.userId}`)
        .then((response) => {
          console.log(response.data);
          setDoctorData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    verifyUser();
  }, [cookies, Navigate, removeCookie]);

  const onFormSubmit = (data, imgData) => {
    axios
      .post("http://localhost:5000/users/update", {
        id: currentUser.userId,
        data: data,
      })
      .then((response) => {
        // Handle the response if needed
        console.log("POST request successful:", response.data);
        axios
          .get(`http://localhost:5000/users/getone/${currentUser.userId}`)
          .then((response) => {
            console.log(response.data);
            setDoctorData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error making POST request:", error);
      });
  };
  return (
    <div class="p-1 px-16">
      <div class="p-8 bg-white shadow mt-24">
        {" "}
        <div class="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              {" "}
              {/* <p class="font-bold text-gray-700 text-xl">22</p>{" "}
              <p class="text-gray-400">Friends</p>{" "} */}
            </div>{" "}
            <div>
              {" "}
              {/* <p class="font-bold text-gray-700 text-xl">10</p>{" "}
              <p class="text-gray-400">Photos</p>{" "} */}
            </div>{" "}
            <div>
              {" "}
              {/* <p class="font-bold text-gray-700 text-xl">89</p>{" "}
              <p class="text-gray-400">Comments</p>{" "} */}
            </div>{" "}
          </div>{" "}
          <div class="relative">
            {" "}
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 -top-10 -mt-24 flex items-center justify-center text-indigo-500">
              <Edit className=" absolute right-[0%] cursor-pointer opacity-20 top-[4%]"></Edit>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>{" "}
            </div>{" "}
          </div>{" "}
          <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            {/* <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              Connect
            </button>{" "} */}
            {/* <button class="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              Message
            </button>{" "} */}
          </div>{" "}
        </div>{" "}
        <div class="mt-20 text-center border-b pb-12 relative">
          {" "}
          <div className="flex gap-2 justify-center items-center">
            <IconButton
              onClick={() => {
                setShowEditForm(true);
                setEditFormTarget("userName");
              }}
            >
              <Edit></Edit>
            </IconButton>
            <h1 class="text-4xl pt-4 font-medium  text-gray-700">
              {doctor.userName}
            </h1>{" "}
          </div>
          <div className="flex justify-center items-center">
            <IconButton
              onClick={() => {
                setShowEditForm(true);
                setEditFormTarget("Specialization");
              }}
            >
              <Edit></Edit>
            </IconButton>
            <p class="font-light text-gray-600 mt-3">{doctor.Specialization}</p>{" "}
          </div>
          <div className="flex justify-center items-center">
            <IconButton
              onClick={() => {
                setShowEditForm(true);
                setEditFormTarget("university");
              }}
            >
              <Edit></Edit>
            </IconButton>

            <p class="mt-8 text-gray-500">{doctor.university}</p>
          </div>
          <div className="flex justify-center items-center">
            <IconButton
              onClick={() => {
                setShowEditForm(true);
                setEditFormTarget("adresses");
              }}
            >
              <Edit></Edit>
            </IconButton>
            <p class="mt-2 text-gray-500">{doctor.adresses}</p>
          </div>
        </div>{" "}
        <div class="mt-12 flex flex-col justify-center relative">
          {" "}
          <div className="flex justify-center items-center">
            <IconButton
              onClick={() => {
                setShowEditForm(true);
                setEditFormTarget("description");
              }}
            >
              <Edit></Edit>
            </IconButton>
            <p class="text-gray-600 text-center font-light lg:px-16">
              {doctor.description}
            </p>{" "}
          </div>
        </div>
      </div>
      {showEditForm ? (
        <>
          <BackGroundShadow
            onClick={() => {
              setShowEditForm(false);
            }}
          ></BackGroundShadow>
          <FaieldEdit
            editFormTarget={editFormTarget}
            onFormSubmit={onFormSubmit}
          ></FaieldEdit>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default DoctorProfile;

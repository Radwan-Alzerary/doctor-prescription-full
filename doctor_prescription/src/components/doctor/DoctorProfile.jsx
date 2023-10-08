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
  const [editFormData, setEditFormData] = useState("");
  const [doctor, setDoctorData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("id", currentUser.userId);

    try {
      const response = await fetch("http://localhost:5000/users/update/image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFile(null);
        axios
          .get(`http://localhost:5000/users/getone/${currentUser.userId}`)
          .then((response) => {
            console.log(response.data);
            setDoctorData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      } else {
        // alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
              {/* <Edit onClick={imageAddHandle} className=" absolute right-[0%] cursor-pointer opacity-20 top-[4%]"></Edit> */}

              {doctor.profileImg ? (
                <img
                  className=" rounded-full h-full w-full overflow-hidden object-cover"
                  src={"http://localhost:5000" + doctor.profileImg}
                  alt=""
                ></img>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </div>{" "}
          </div>{" "}
          <div>
            <p>تحميل صورة شخصية</p>
            <input
              type="file"
              className=""
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
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
                setEditFormTarget("userName");
                setEditFormData(doctor.userName);
                setShowEditForm(true);

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
                setEditFormTarget("Specialization");
                setEditFormData(doctor.Specialization);
                setShowEditForm(true);

              }}
            >
              <Edit></Edit>
            </IconButton>
            <p class="font-light text-gray-600 mt-3">{doctor.Specialization}</p>{" "}
          </div>
          <div className="flex justify-center items-center">
            <IconButton
              onClick={() => {
                setEditFormTarget("university");
                setEditFormData(doctor.university);
                setShowEditForm(true);

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
                setEditFormData(doctor.adresses);
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
                setEditFormData(doctor.description);
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
            editFormData={editFormData}
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

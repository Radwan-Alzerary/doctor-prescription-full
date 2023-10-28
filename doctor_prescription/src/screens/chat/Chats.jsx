import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../../util/APIRoutes";
import { io } from "socket.io-client";
import Contacts from "../../components/chat/Contacts";
import Welcome from "../../components/chat/Welcome";
import ChatContainer from "../../components/chat/ChatContainer";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import DoctorProfileView from "../../components/doctor/DoctorProfileView";
import BackGroundShadow from "../../components/pageCompond/BackGroundShadow";

export default function Chats() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  const searchInputHandle = (value) => {
    const getCurrentUser = async () => {
      if (currentUser) {
    
        const data = await axios.get(
          `${serverAddress}/users/allUsers/${currentUser.userId}/name/${value}`
        );
        setContacts(data.data);
      }
    };
    getCurrentUser();
  };

  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await axios.post(
        `${serverAddress}/users`,
        {},
        {
          withCredentials: true,
        }
      );
      if (!data.status) {
        removeCookie("jwt");
        navigate("/login");
      } else setCurrentUser(data);
      setIsLoaded(true);
      toast(`Hi ${data.user} 🦄`, {
        theme: "dark",
      });
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.userId);
    }
  }, [currentUser]);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (currentUser) {
        const data = await axios.get(
          `${serverAddress}/users/allUsers/${
            currentUser.userId
          }/name/${""}`
        );
        setContacts(data.data);
      }
    };
    getCurrentUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="flex h-full">
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        searchInputHandle={searchInputHandle}
        changeChat={handleChatChange}
      />
      {isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser} />
      ) : (
        <ChatContainer
          onNameClickHandle={(id) => {
            setDoctorId(id);
            setShowDoctorProfile(true);
          }}
          currentChat={currentChat}
          socket={socket}
          currentUser={currentUser}
        />
      )}
      {showDoctorProfile ? (
        <>
          <DoctorProfileView doctorId={doctorId}></DoctorProfileView>
          <BackGroundShadow
            onClick={() => {
              setShowDoctorProfile(false);
            }}
          ></BackGroundShadow>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

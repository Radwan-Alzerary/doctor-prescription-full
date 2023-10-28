import { Avatar, IconButton, InputBase, TextField } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import styled from "styled-components";
// import Logo from '../assets/logo.svg'
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Contacts({ contacts, currentUser, changeChat,searchInputHandle }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const currentURL = window.location.origin; // Get the current URL
  const serverAddress = currentURL.replace(/:\d+/, ":5000"); // Replace the port with 5000      // Fetch dashboard data first

  console.log(contacts);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container>
        <div className="brand">
          <div className=" flex flex-col justify-center items-center p-4">
            <div className="flex bg-white px-4 py-1 rounded-3xl w-full">
              <InputBase
                onChange={(event)=>{searchInputHandle(event.target.value)}}
                sx={{ ml: 1, flex: 1 }}
                placeholder="البحث عن طبيب"
                inputProps={{ "aria-label": "البحث عن طبيب" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={contact._id}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                {contact.profileImg ? (
                  <img
                  className=" rounded-full"
                    src={
                      `${serverAddress}` +
                      contact.profileImg
                    }
                    alt=""
                  ></img>
                ) : (
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {contact.userName}
                </Avatar>

                )}

                </div>
                <div className="username">
                  <h3>{contact.userName}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  width: 25%;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          text-transform: capitalize;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
// import Logout from './Logout';
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../../util/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function ChatContainer({ currentChat, currentUser, socket ,onNameClickHandle}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    console.log("current");
    console.log(currentUser);
    console.log("current");

    const fetchData = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser.userId,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser.userId,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser.userId,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
    });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieved", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(messages);
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header w-full bg-slate-800 text-center relative">
            <div className=" w-full ">
              <div onClick={()=>{onNameClickHandle(currentChat._id)}} className="username text-center text-white cursor-pointer w-full hover:text-blue-400">
                <h3>{currentChat.userName}</h3>
              </div>
            </div>
            {/* <Logout /> */}
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    {!message.fromSelf ? (
                      <Avatar className="mx-2"  sx={{ bgcolor: deepPurple[500] }}>
                        {message.fromSelf
                          ? currentUser.userName
                          : currentChat.userName}
                      </Avatar>
                    ) : (
                      ""
                    )}
                    <div className="content ">
                      <div className="avatar"></div>

                      <p>{message.message}</p>
                    </div>
                    {message.fromSelf ? (
                      <Avatar className="mx-2" sx={{ bgcolor: deepPurple[500] }}>
                        {message.fromSelf
                          ? currentUser.userName
                          : currentChat.userName}
                      </Avatar>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;

  width: 80%;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        // background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        // color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

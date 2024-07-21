import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { useDispatch, useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest.js";
import Conversation from "../../components/conversation/Conversation.jsx";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import Home from "../../assets/img/home.png";
import Noti from "../../assets/img/noti.png";
import Comment from "../../assets/img/comment.png";
import ChatBox from "../../components/chatBox/ChatBox.jsx";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.AuthReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const handleCommentClick = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  }
  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    if (window.innerWidth <= 768) {
      setIsOffCanvasOpen(false); // Close the off-canvas on mobile view
    }
  }

  return (
    <div className="Chat">
      {}
      <div className={`Left-side-chat ${isOffCanvasOpen ? 'open' : ''}`}>
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
               <div onClick={() => handleChatClick(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {}
      <div className="Right-side-chat">
        <div className="chatbox-container">
          <div className="navIcon">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="../chat" onClick={handleCommentClick}>
              <img src={Comment} alt="" />
            </Link>
          </div>
          {currentChat ? (
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          ) : (
            <div className="chatbox-empty-message">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Chat;

/*
    {chats.map((chat) => (
                    <div>
                        <Conversation data= {chat} currentUser={user._id} />
                    </div>
                ))}
*/

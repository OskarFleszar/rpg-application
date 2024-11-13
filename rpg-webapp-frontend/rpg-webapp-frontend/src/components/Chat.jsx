import React, { useState, useEffect, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axios from "axios";

let stompClient = null;

const Chat = ({ campaignId }) => {
  const [publicChats, setPublicChats] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState({
    nickname: loggedInUser.nickname,
    connected: false,
    message: "",
  });

  const token = localStorage.getItem("token");
  const subscribedRef = useRef(false);

  const connectUser = () => {
    if (stompClient && stompClient.connected) return;

    const Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);

    stompClient.connect(
      { Authorization: `Bearer ${token}` },
      onConnected,
      onError
    );
  };

  const onConnected = () => {
    setUserData((prevData) => ({ ...prevData, connected: true }));

    if (!subscribedRef.current) {
      stompClient.subscribe(`/chatroom/${campaignId}`, onPublicMessageReceived);
      subscribedRef.current = true;
    }
  };

  const onPublicMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    console.log("Otrzymana wiadomość:", payloadData); // Dodaj logowanie
    setPublicChats((prevChats) => [...prevChats, payloadData]);
  };

  const onError = (err) => {
    console.error("Error connecting to WebSocket:", err);
    setUserData((prevData) => ({ ...prevData, connected: false }));
  };

  const handleMessageChange = (event) => {
    setUserData({ ...userData, message: event.target.value });
  };

  const sendMessage = () => {
    if (
      stompClient &&
      stompClient.connected &&
      userData.message.trim() !== ""
    ) {
      const chatMessage = {
        content: userData.message,
        userId: loggedInUser.userId,
        nickname: loggedInUser.nickname, // Dodajemy nickname do wiadomości
        timestamp: new Date().toISOString(),
        type: "message",
      };
      stompClient.send(
        `/app/message/${campaignId}`,
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  useEffect(() => {
    connectUser();

    axios
      .get(`http://localhost:8080/api/chat/${campaignId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPublicChats(response.data);
      })
      .catch((error) => console.error("Failed to fetch chat history:", error));

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected WebSocket connection.");
        });
      }
      subscribedRef.current = false;
    };
  }, [campaignId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString("default", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div>
        {publicChats.map((chat, index) => (
          <div key={index}>
            <strong>{chat.nickname || "Nieznany użytkownik"}</strong>:{" "}
            {chat.content}{" "}
            <small>({formatDate(chat.timestamp || chat.messageTime)})</small>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          value={userData.message}
          onChange={handleMessageChange}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

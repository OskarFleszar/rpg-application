import React, { useState, useEffect, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axios from "axios";
// import { parseISO, format } from "date-fns"; // jeśli używasz Date-fns

let stompClient = null;

const Chat = ({ campaignId }) => {
  const [publicChats, setPublicChats] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState({
    nickname: loggedInUser.nickname,
    connected: false,
    message: "",
  });
  const [rollData, setRollData] = useState({
    rollType: "d6",
    numberOfDice: 1,
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

    console.log("Otrzymana wiadomość:", payloadData);

    if (payloadData.content) {
      console.log("To jest wiadomość tekstowa.");

      setPublicChats((prevChats) => [
        ...prevChats,
        {
          ...payloadData,
          timestamp: payloadData.timestamp || payloadData.messageTime,
        },
      ]);
    } else if (payloadData.rollResult) {
      console.log("To jest wynik rzutu.");

      setPublicChats((prevChats) => [...prevChats, payloadData]);
    } else {
      console.warn("Nieznany typ wiadomości:", payloadData);
    }
  };

  const onError = (err) => {
    console.error("Error connecting to WebSocket:", err);
    setUserData((prevData) => ({ ...prevData, connected: false }));
  };

  const handleMessageChange = (event) => {
    setUserData({ ...userData, message: event.target.value });
  };

  const handleRollTypeChange = (event) => {
    setRollData({ ...rollData, rollType: event.target.value });
  };

  const handleNumberOfDiceChange = (event) => {
    setRollData({ ...rollData, numberOfDice: parseInt(event.target.value) });
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
        nickname: loggedInUser.nickname,
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

  const sendRoll = () => {
    if (stompClient && stompClient.connected) {
      const rollMessage = {
        rollType: rollData.rollType,
        numberOfDice: rollData.numberOfDice,
        userId: loggedInUser.userId,
        nickname: loggedInUser.nickname,
      };
      stompClient.send(
        `/app/roll/${campaignId}`,
        {},
        JSON.stringify(rollMessage)
      );
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
    if (isNaN(date.getTime())) return timestamp; // Zwraca oryginalny tekst, jeśli format nie jest poprawny
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
            {chat.content ||
              `Rzucił: ${chat.numberOfDice}x ${chat.rollType} = ${
                chat.rollResult
              } (wyniki: ${chat.singleDiceResult?.join(", ")})`}{" "}
            <small>({formatDate(chat.timestamp || chat.rollTime)})</small>
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
      <div>
        <select value={rollData.rollType} onChange={handleRollTypeChange}>
          <option value="d4">d4</option>
          <option value="d6">d6</option>
          <option value="d8">d8</option>
          <option value="d10">d10</option>
          <option value="d12">d12</option>
          <option value="d20">d20</option>
          <option value="d100">d100</option>
        </select>
        <input
          type="number"
          min="1"
          value={rollData.numberOfDice}
          onChange={handleNumberOfDiceChange}
          placeholder="Liczba kości"
        />
        <button onClick={sendRoll}>Rzuć</button>
      </div>
    </div>
  );
};

export default Chat;

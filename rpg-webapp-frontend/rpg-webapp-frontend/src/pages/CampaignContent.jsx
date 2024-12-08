import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import DrawingBoard from "../components/DrawingBoard";

const CampaignContent = () => {
  const { id } = useParams();
  const [addUserNickname, setAddUserNickname] = useState("");
  const [showAddUserInput, setShowAddUserInput] = useState(false);
  const [campaignData, setCampaignData] = useState(null);
  const [isGameMaster, setIsGameMaster] = useState(false);

  useEffect(() => {
    // Funkcja do pobrania danych kampanii
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/campaign/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCampaignData(response.data);

        const loggedInUser = JSON.parse(localStorage.getItem("userData"));
        console.log("zalogowany użytkownik: ", loggedInUser.userId);

        if (response.data.gameMaster.userId === parseInt(loggedInUser.userId)) {
          setIsGameMaster(true);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych kampanii:", error);
      }
    };

    fetchCampaignData();
  }, [id]);

  const handleAddPlayer = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/campaign/${id}/add`,
        { nickname: addUserNickname },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAddUserNickname("");
      setShowAddUserInput(false);
    } catch (error) {
      console.error("Błąd podczas dodawania użytkownika:", error);
    }
  };

  return (
    <div>
      {isGameMaster &&
        (showAddUserInput ? (
          <div>
            <input
              type="text"
              placeholder="nickname"
              value={addUserNickname}
              onChange={(e) => setAddUserNickname(e.target.value)}
            />
            <button onClick={handleAddPlayer}>Dodaj</button>
            <button onClick={() => setShowAddUserInput(false)}>Anuluj</button>
          </div>
        ) : (
          <button onClick={() => setShowAddUserInput(true)}>
            Dodaj nowego użytkownika
          </button>
        ))}
      <Chat campaignId={id} />
      <DrawingBoard campaignId={id} />
    </div>
  );
};

export default CampaignContent;

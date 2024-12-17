import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import DrawingBoard from "../components/DrawingBoard";
import "../styles/CampaignContent.sass";
import axios from "axios";

const CampaignContent = () => {
  const { id } = useParams();
  const [addUserNickname, setAddUserNickname] = useState("");
  const [showAddUserInput, setShowAddUserInput] = useState(false);
  const [isGameMaster, setIsGameMaster] = useState(false);

  useEffect(() => {
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

        const loggedInUser = JSON.parse(localStorage.getItem("userData"));
        if (response.data.gameMaster.userId === parseInt(loggedInUser.userId)) {
          setIsGameMaster(true);
          console.log(
            "id gracza:",
            parseInt(loggedInUser.userId),
            "id gamemastera: ",
            response.data.gameMaster.userId,
            "   ",
            isGameMaster
          );
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
      <div className="left-panel">
        {isGameMaster &&
          (showAddUserInput ? (
            <div>
              <input
                type="text"
                placeholder="Nickname"
                value={addUserNickname}
                onChange={(e) => setAddUserNickname(e.target.value)}
              />
              <button onClick={handleAddPlayer}>Dodaj</button>
              <button onClick={() => setShowAddUserInput(false)}>Anuluj</button>
            </div>
          ) : (
            <button
              className="add-player"
              onClick={() => setShowAddUserInput(true)}
            >
              Dodaj nowego użytkownika
            </button>
          ))}
      </div>
      <div className="campaign-container">
        <div>
          <DrawingBoard campaignId={id} />
        </div>
        <div className="chat-container">
          <Chat campaignId={id} />
        </div>
      </div>
    </div>
  );
};

export default CampaignContent;

import React, { useRef, useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import axios from "axios";

let stompClient = null;

const DrawingBoard = ({ campaignId }) => {
  const canvasRef = useRef(null);
  const subscribedRef = useRef(false);
  const [drawings, setDrawings] = useState([]); // Wszystkie rysunki
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingData, setDrawingData] = useState({
    color: "#000000",
    lineWidth: 2,
    points: [],
  });
  const token = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  const MAX_BATCH_SIZE = 100; // Maksymalny rozmiar batcha (np. 100 punktów)

  // WebSocket connection setup
  const connectWebSocket = () => {
    if (stompClient && stompClient.connected) return;

    const Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);

    stompClient.connect(
      { Authorization: `Bearer ${token}` },
      onConnected,
      (err) => console.error("WebSocket error:", err)
    );
  };

  const onConnected = () => {
    console.log("WebSocket connected");
    if (!subscribedRef.current) {
      stompClient.subscribe(`/topic/${campaignId}`, onDrawingReceived);
      subscribedRef.current = true;
    }
  };

  const onDrawingReceived = (payload) => {
    try {
      const receivedDrawing = JSON.parse(payload.body);
      console.log("Otrzymano rysunek:", receivedDrawing);

      if (receivedDrawing && receivedDrawing.drawingData) {
        // Najpierw parsujemy pierwszy poziom zagnieżdżenia
        const mainData = JSON.parse(receivedDrawing.drawingData);

        // Teraz parsujemy właściwy obiekt rysunku
        const parsedDrawing = JSON.parse(mainData.drawingData);

        setDrawings((prev) => [...prev, parsedDrawing]); // Dodajemy nowy rysunek do tablicy
        renderDrawing(parsedDrawing); // Rysujemy otrzymany rysunek
      } else {
        console.warn("Nieprawidłowe dane rysunku:", receivedDrawing);
      }
    } catch (err) {
      console.error("Błąd podczas przetwarzania wiadomości WebSocket:", err);
    }
  };

  const sendDrawingInBatches = (drawingData) => {
    const points = drawingData.points;
    const totalBatches = Math.ceil(points.length / MAX_BATCH_SIZE);

    for (let i = 0; i < totalBatches; i++) {
      const batchPoints = points.slice(
        i * MAX_BATCH_SIZE,
        (i + 1) * MAX_BATCH_SIZE
      );

      const batchData = {
        ...drawingData,
        points: batchPoints,
      };

      // Wysyłamy każdą porcję osobno
      stompClient.send(
        `/app/drawing/${campaignId}`,
        {},
        JSON.stringify({
          drawingData: JSON.stringify(batchData),
          userId: loggedInUser.userId,
          nickname: loggedInUser.nickname,
          timestamp: new Date().toISOString(),
        })
      );
    }
  };

  const sendDrawing = () => {
    if (stompClient && stompClient.connected && drawingData.points.length > 0) {
      sendDrawingInBatches(drawingData); // Wysyłamy dane w porcjach
      setDrawings((prev) => [...prev, drawingData]); // Dodajemy lokalny rysunek
      renderDrawing(drawingData); // Rysujemy lokalnie
      setDrawingData((prev) => ({ ...prev, points: [] })); // Resetujemy punkty po wysłaniu
    } else {
      console.error(
        "WebSocket nie jest połączony lub brak punktów do wysłania"
      );
    }
  };

  const loadDrawings = () => {
    axios
      .get(`http://localhost:8080/api/drawing/${campaignId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          const parsedDrawings = response.data.map((drawing) => {
            try {
              const mainData = JSON.parse(drawing.drawingData);
              return JSON.parse(mainData.drawingData); // Parse twice
            } catch (err) {
              console.error("Błąd podczas parsowania rysunku:", err, drawing);
              return null;
            }
          });
          setDrawings(parsedDrawings.filter((d) => d !== null));
        } else {
          console.error("Nieprawidłowy format danych z API:", response.data);
        }
      })
      .catch((err) => console.error("Błąd ładowania rysunków:", err));
  };

  const renderDrawing = (drawing) => {
    const canvas = canvasRef.current;
    if (!canvas || !drawing || !Array.isArray(drawing.points)) return;

    const context = canvas.getContext("2d");
    context.strokeStyle = drawing.color || "#000000";
    context.lineWidth = drawing.lineWidth || 2;

    context.beginPath();
    drawing.points.forEach((point, index) => {
      if (index === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    });
    context.stroke();
  };

  const renderAllDrawings = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawings.forEach((drawing) => renderDrawing(drawing));
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDrawingData((prev) => ({
      ...prev,
      points: [...prev.points, { x, y }],
    }));
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.strokeStyle = drawingData.color;
    context.lineWidth = drawingData.lineWidth;
    context.lineJoin = "round";
    context.lineCap = "round";

    context.beginPath();
    const lastPoint = drawingData.points[drawingData.points.length - 1];
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(x, y);
    context.stroke();

    setDrawingData((prev) => ({
      ...prev,
      points: [...prev.points, { x, y }],
    }));
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    sendDrawing();
  };

  useEffect(() => {
    connectWebSocket();
    loadDrawings();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
      subscribedRef.current = false;
    };
  }, [campaignId]);

  useEffect(() => {
    renderAllDrawings();
  }, [drawings]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Kolor linii:
          <input
            type="color"
            value={drawingData.color}
            onChange={(e) =>
              setDrawingData((prev) => ({ ...prev, color: e.target.value }))
            }
            style={{ marginLeft: "10px" }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Szerokość linii:
          <input
            type="number"
            min="1"
            max="20"
            value={drawingData.lineWidth}
            onChange={(e) =>
              setDrawingData((prev) => ({
                ...prev,
                lineWidth: parseInt(e.target.value, 10),
              }))
            }
            style={{ marginLeft: "10px", width: "50px" }}
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black", backgroundColor: "white" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default DrawingBoard;

import { useState, useRef, useEffect } from "react";
import socket from "../config/socket-config";
import Messages from "./base/Messages";
import Header from "./base/Header";
import Footer from "./base/Footer";

export default function App() {
  // const [selectedRoom, setSelectedRoom] = useState("General");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server!");
    });

    socket.on("matched", (room) => {
      setStatus(null);
      setIsMatched(true);
      setRoom(room);
    });

    socket.on("receivedMessage", (message, id) => {
      setMessages((prev) => [...prev, { message, userId: id }]);
      console.log(`A message is received!`);
    });

    socket.on("wait", (status) => {
      setStatus(status);
    });

    socket.on("strangerDisconnected", () => {
      setConnected(false);
      setIsMatched(false);
      alert("Stranger Disconnected!");
    });

    return () => {
      socket.off("matched");
      socket.off("receivedMessage");
      socket.off("wait");
      socket.off("strangerDisconnected");
    };
  }, []);

  function sendMessage() {
    if (room && input.trim()) {
      socket.emit("sendMessage", room, input);
      setMessages((prev) => [...prev, { message: input, userId: null }]);
      setInput("");
    }
    console.log(messages);
  }

  // Functions
  function handleConnection() {
    console.log("Connection is clicked!");
    setConnected(true);
    socket.connect();
  }

  function handleDisconnect() {
    console.log("Connection disconnected!");
    setConnected(false);
    setMessages([]);
    setIsMatched(false);
    socket.disconnect();
  }

  return (
    <div className="flex h-screen justify-center items-center p-4 bg-gray-100">
      {/* Chat Box */}
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%] h-full sm:h-[90%] drop-shadow-xl bg-white rounded-xl flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          connected={connected}
          handleDisconnect={handleDisconnect}
          status={status}
        />

        {/* Messages */}
        <Messages
          messages={messages}
          connected={connected}
          handleConnection={handleConnection}
          handleDisconnect={handleDisconnect}
          matched={isMatched}
        />

        {/* Footer */}
        <Footer
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          connected={connected}
          status={status}
        />
      </div>
    </div>
  );
}

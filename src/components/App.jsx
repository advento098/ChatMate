import { useState, useRef, useEffect } from "react";
import { Mic, Send, Info } from "lucide-react";

const rooms = ["General", "Tech", "Random"];

export default function App() {
  // const [selectedRoom, setSelectedRoom] = useState("General");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { room: selectedRoom, text: [input] }]);
      setInput("");
      console.log(messages);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex h-screen">
      {/* Chat Box */}
      <div className="w-1/4 mx-50 my-10 drop-shadow-xl flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-white shadow">
          <h3 className="text-lg font-semibold">ChatMate</h3>
          <Info className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-500" />
        </div>

        {/* Messages */}
        <div className="flex flex-col-reverse snap-y flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar">
          <div ref={messagesEndRef} />
          {[...messages]
            .filter((msg) => msg.room === selectedRoom)
            .reverse()
            .map((msg, idx) => (
              <div key={idx} className="mb-2 flex flex-initial justify-end">
                <div className="bg-blue-100 p-2 rounded max-w-xs w-fit">
                  {msg.text}
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-4 py-2 focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Mic className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black" />
          <Send
            className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

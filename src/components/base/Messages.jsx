import { useRef, useEffect, useState } from "react";
import Button from "../ui/Button";

export default function Messages({
  messages,
  connected,
  userId,
  handleConnection,
  handleDisconnect,
  matched,
}) {
  const messagesEndRef = useRef(null);
  const [reminder, setReminder] = useState();
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={`flex flex-col-reverse snap-y flex-1 overflow-y-auto p-4 bg-gray-50
          scrollbar`}
    >
      <div ref={messagesEndRef} /> {/* Only for scrolling effects */}
      {[...messages].reverse().map((msg, idx) => (
        <div
          key={idx}
          className={
            msg.userId
              ? "mb-2 flex flex-initial justify-start"
              : "mb-2 flex flex-initial justify-end"
          }
        >
          <div
            className={
              msg.userId
                ? "bg-blue-100 p-2 rounded max-w-xs w-fit"
                : "bg-blue-200 p-2 rounded max-w-xs w-fit"
            }
          >
            {msg.message}
          </div>
        </div>
      ))}
      {matched && messages.length === 0 && (
        <div className="text-center">You are matched with a stranger!</div>
      )}
      {!connected && (
        <div className="w-full h-10 flex justify-center align-middle">
          <Button onClick={handleConnection}>Connect to a stranger</Button>
        </div>
      )}
    </div>
  );
}

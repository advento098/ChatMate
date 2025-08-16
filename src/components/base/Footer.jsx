import { Send } from "lucide-react";

export default function Footer({
  input,
  setInput,
  sendMessage,
  connected,
  status,
}) {
  return (
    <div className="p-4 border-t bg-white flex items-center gap-2">
      <input
        type="text"
        className="flex-1 border rounded px-4 py-2 focus:outline-none"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        disabled={!connected && status == "Waiting for a match"}
      />
      <Send
        className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-700"
        onClick={sendMessage}
      />
    </div>
  );
}

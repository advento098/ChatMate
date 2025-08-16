import { Send } from "lucide-react";
import { useState, useRef } from "react";

export default function Footer({
  input,
  setInput,
  sendMessage,
  connected,
  status,
}) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioURL = URL.createObjectURL(blob);
        const audio = new Audio(audioURL);
        audio.play(); // 🔊 play it back
        // TODO: emit blob to server or upload to backend
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Mic access denied or error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

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

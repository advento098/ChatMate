import { Info } from "lucide-react";
import Button from "../ui/Button";

export default function Header({ connected, handleDisconnect, status }) {
  return (
    <div className="flex justify-between items-center p-4 h-20 border-b bg-white shadow">
      <h3 className="text-lg font-semibold">ChatMate</h3>
      {connected && (
        <Button onClick={handleDisconnect}>{status || "Disconnect"}</Button>
      )}
      <Info className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-500" />
    </div>
  );
}

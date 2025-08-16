import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import env from "dotenv";

env.config();
const app = express();
app.use(cors());
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 3000;

// Simple queue to match random users
let waitingUser = null;

io.on("connection", (socket) => {
  console.log(`Socket established with socket id of: ${socket.id}`);
  if (waitingUser) {
    const room = `${waitingUser.id}-${socket.id}`;
    waitingUser.join(room);
    socket.join(room);

    waitingUser.emit("matched", room);
    socket.emit("matched", room);

    console.log(`Joined users at room: ${room}`);

    waitingUser = null;
  } else {
    waitingUser = socket;
    waitingUser.emit("wait", "Waiting for a match");
  }

  socket.on("sendMessage", (room, message) => {
    socket.to(room).emit("receivedMessage", message, socket.id);
    console.log(`Send ${message} to room ${room}`);
  });

  socket.on("disconnect", () => {
    if (waitingUser === socket) {
      // Checker to reset if no room yet
      waitingUser = null;
      console.log(`Stranger disconnected (waiting)`);
    } else {
      // To notify the other person
      // Note: socket.rooms gets the current room of the disconnected socket
      const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
      rooms.forEach((roomId) => {
        socket.to(roomId).emit("strangerDisconnected");
      });
      console.log(`Stranger disconnected`);
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

// routes
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contacts";
import conversationRoutes from "./routes/conversation";
import WebSocket from "./controllers/socket";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || "5000";
const server = http.createServer(app);
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", [authRoutes, contactRoutes, conversationRoutes]);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const webSocket = new WebSocket(socket, prisma);
  const myId = socket.handshake.query.userId;

  webSocket.connection();

  console.log(socket.id);
  
  socket.on("login", () => webSocket.login());
  socket.on("logout", () => webSocket.logout());
  socket.on("message", () => webSocket.message());
  socket.on("disconnect", () => webSocket.disconnect());
  socket.on("conversationChange", () => webSocket.conversationChange());
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

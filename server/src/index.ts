import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

// routes
import authRoutes from './routes/auth'
import contactRoutes from './routes/contacts'

const app = express();
const port = process.env.PORT || "5000";
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", [authRoutes, contactRoutes]);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket);
});
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

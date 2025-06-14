import { Server } from "socket.io";

const connections = {};
const messages = {};
const timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-call", (path) => {
      if (!connections[path]) {
        connections[path] = [];
      }

      connections[path].push(socket.id);
      timeOnline[socket.id] = new Date();

      // Notify others
      connections[path].forEach((id) => {
        io.to(id).emit("user-joined", socket.id, connections[path]);
      });

      // Send previous messages to new user
      if (messages[path]) {
        messages[path].forEach((msg) => {
          io.to(socket.id).emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg["socket-id-sender"]
          );
        });
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      let foundRoom = Object.entries(connections).find(([_, users]) =>
        users.includes(socket.id)
      );

      if (foundRoom) {
        const [roomKey, users] = foundRoom;

        if (!messages[roomKey]) messages[roomKey] = [];
        messages[roomKey].push({
          sender,
          data,
          "socket-id-sender": socket.id,
        });

        users.forEach((id) => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });

        console.log("Message in", roomKey, ":", sender, data);
      }
    });

    socket.on("disconnect", () => {
      const joinTime = timeOnline[socket.id];
      if (joinTime) {
        const diffTime = Math.abs(new Date() - joinTime);
        console.log(`User ${socket.id} was online for ${diffTime / 1000}s`);
      }

      delete timeOnline[socket.id];

      Object.entries(connections).forEach(([roomKey, users]) => {
        const index = users.indexOf(socket.id);
        if (index !== -1) {
          users.splice(index, 1);

          users.forEach((id) => {
            io.to(id).emit("user-left", socket.id);
          });

          if (users.length === 0) {
            delete connections[roomKey];
            delete messages[roomKey];
          }
        }
      });
    });
  });

  return io;
};

export default connectToSocket;

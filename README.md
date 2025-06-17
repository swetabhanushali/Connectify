# Connectify – Real-Time Video Conferencing App

**Connectify** is a browser-based real-time video conferencing app built using the **MERN stack**, **WebRTC**, and **Socket.io**. It allows users to join virtual rooms, connect over peer-to-peer audio/video, and exchange real-time chat messages—without relying on third-party services like Zoom or Google Meet.

---

## 🚀 Features

- Join or create virtual meeting rooms
- Peer-to-peer video and audio communication via **WebRTC**
- Real-time chat messaging powered by **Socket.io**
- Toggle mic/camera and reset media permissions on the fly
- 100% browser-based with no external video APIs

---

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **WebRTC:** Peer-to-peer audio/video connections
- **Socket.io:** Real-time signaling and chat
- **MongoDB:** For storing user/session data

---

## 🔍 How It Works

1. When a user joins a room, the browser requests camera and microphone access using `getUserMedia()`.
2. **WebRTC** establishes peer-to-peer video/audio connections.
3. **Socket.io** manages the signaling process by exchanging session descriptions and ICE candidates.
4. Chat messages are also sent in real-time through **Socket.io**.
5. Users can control their mic/camera and reset permissions as needed.

---

## 💡 Why It’s Special

Connectify is built entirely using native browser APIs and low-level WebRTC logic, offering a deep dive into the mechanics of real-time communication systems—without relying on services like Twilio or Jitsi.

---

## 🧠 What I Learned

- WebRTC fundamentals and peer connection setup
- Media stream handling in the browser
- Real-time event flow using Socket.io
- Structuring and deploying a full-stack MERN application with real-time capabilities

---

## 🧩 Use Case

Perfect for:
- Quick, private, one-on-one video calls
- Lightweight, privacy-focused meetings
- Learning the inner workings of WebRTC and real-time apps

---




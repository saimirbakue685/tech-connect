/* 
Filename: ComplexCode.js

Description: This code demonstrates a complex and sophisticated JavaScript program that implements a web-based chat application with real-time features. It utilizes modern web technologies and libraries such as Node.js, Express.js, Socket.io, and MongoDB.

Please note that this code is for demonstration purposes only and may require additional setup, configurations, and dependencies.

*/

// Importing required modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

// Set up the MongoDB connection
mongoose.connect('mongodb://localhost/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define the chat message schema
const chatMessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

// Define the chat room schema
const chatRoomSchema = new mongoose.Schema({
  name: String,
  users: [String],
});

// Define the chat room model
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

// Create an Express.js application
const app = express();

// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Register the 'connection' event listener for Socket.io
io.on('connection', (socket) => {
  console.log('User connected');

  // Load existing chat messages and send them to the client
  ChatMessage.find()
    .sort({ timestamp: 1 })
    .exec((err, messages) => {
      if (err) {
        console.error('Error fetching chat messages:', err);
      } else {
        socket.emit('load_messages', messages);
      }
    });

  // Register the 'new_message' event listener for Socket.io
  socket.on('new_message', (data) => {
    console.log('Received new message:', data);

    // Save the new chat message to the MongoDB
    const message = new ChatMessage(data);
    message.save((err) => {
      if (err) {
        console.error('Error saving chat message:', err);
      } else {
        // Broadcast the new chat message to all connected clients
        socket.broadcast.emit('new_message', message);
      }
    });
  });

  // Register the 'join_room' event listener for Socket.io
  socket.on('join_room', (roomName, callback) => {
    // Check if the requested chat room exists
    ChatRoom.findOne({ name: roomName }, (err, room) => {
      if (err) {
        console.error('Error fetching chat room:', err);
      } else {
        if (!room) {
          // Create a new chat room if it doesn't exist
          const newRoom = new ChatRoom({ name: roomName });
          newRoom.save((err) => {
            if (err) {
              console.error('Error creating chat room:', err);
              callback(false);
            } else {
              socket.join(roomName);
              callback(true);
            }
          });
        } else {
          socket.join(roomName);
          callback(true);
        }
      }
    });
  });

  // Register the 'leave_room' event listener for Socket.io
  socket.on('leave_room', (roomName, callback) => {
    socket.leave(roomName);
    callback();
  });

  // Register the 'disconnect' event listener for Socket.io
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Chat App server started on http://localhost:3000');
});
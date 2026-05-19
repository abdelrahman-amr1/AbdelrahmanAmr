const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const waRoutes = require('./routes/waRoutes');
const contactRoutes = require('./routes/contactRoutes');
const featureRoutes = require('./routes/featureRoutes');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', waRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/features', featureRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Initialize WhatsApp Service
require('./services/waService').initialize(io);

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

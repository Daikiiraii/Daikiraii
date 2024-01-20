const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('Пользователь подключен');

  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data);
  });

  socket.on('clearCanvas', () => {
    socket.broadcast.emit('clearCanvas');
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключен');
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

exports.connectionHandler = function(socket) {
  console.log('User connected via socket.io');
  socket.emit('hello', { message: 'You have joined the chat client!' });
  socket.on('connected', function(data) {

  });
};

exports.disconnectHandler = function(socket) {
  console.log('User disconnected via socket.io');
  socket.emit('userLeft', { message: 'A user has left the chat client' });
};
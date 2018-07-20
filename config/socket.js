
module.exports = function(http, Users) {
    const io = require('socket.io')(http, { wsEngine: 'ws' });

    io.on('connection', function(server) {
        var userId = server.id;

        server.on('disconnect', function() {
            server.broadcast.emit('sayGoodbye', Users.users[userId]);
            Users.delete(userId);
        });
        
        server.on('userHasRegistered', function(username) {
            Users.add(userId, username);
            server.broadcast.emit('receiveUser', username); // tells everyone to receive new user
            server.emit('getOnlineUsers', Object.values(Users.users));
        });

        server.on('userSentMessage', function(msg) {
            server.broadcast.emit('receiveMessage', msg); // tells everyone to receive new message
        });

    });

    return io;
}
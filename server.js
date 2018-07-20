const express = require('express');
const app = express();
const http = require('http').Server(app);
const Users = require('./users.js')();
const socket = require('./config/socket.js')(http, Users);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('index.html', { root: 'public' });
});

http.listen(process.env.PORT || 3000, function() {
    console.log('Listening at http://localhost:3000...');
});

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const request = require('request');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

app.set('view engine', 'ejs');

request('https://v2.jokeapi.dev/joke/Any', function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data)

  }
})

function sendJoke() {
  fetch("https://v2.jokeapi.dev/joke/Any%22")
 .then(res => res.json())
 .then(data => console.log(data)) // will log js object
 .catch(err => console.log(err))

}


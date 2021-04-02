var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

users = [];

io.on("connection", function(socket){
    console.log("connected: " + socket.id);

    socket.on("disconnect", function(){
        console.log("disconnect: " + socket.id);
    })

    socket.on('client-register', function(data){
        if(users.indexOf(data) === -1){
            users.push(data);
            socket.username = data;
            socket.emit('server-send-user-hople', data);
            io.sockets.emit("server-send-list-user", users)
        }
        else{
            socket.emit('server-send-user-tontai');
        }

        socket.on('client-send-message',function(data){
            io.sockets.emit('server-send-all-user', {username: socket.username, content: data})
        })

        socket.on('toi-dang-chat', function(){
            socket.broadcast.emit('thong-bao-dang-chat', socket.username)
        })

        socket.on('toi-stop-chat', function(){
            socket.broadcast.emit('thong-bao-dang-stop', socket.username)
        })

        socket.on('client-logout', function(){
            users.splice(users.indexOf(socket.username), 1);
            socket.broadcast.emit('server-send-list-user', users)
        })



        // io.sockets.emit('server-send-data', data + '888');
        // socket.emit('server-send-data', data + '888');
        // socket.broadcast.emit('server-send-data', data + '888');

    })
});

app.get("/", function(req, res){
    res.render("trangchu");
});
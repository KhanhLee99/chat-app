// var socket = io("http://localhost:3000");
var socket = io("https://khanh-chat-app.herokuapp.com");

socket.on('server-send-user-tontai', function(){
    alert("user da ton tai")
})

socket.on('server-send-user-hople', function(data){
    $("#currentUser").html(data);
    $("#formRegister").hide(2000);
    $("#formMessage").show(1000);
})

socket.on('server-send-list-user', function(data){
    $('#userOnline').html("");
    data.forEach(function(user){ 
        $('#userOnline').append("<div class='user'>"+user+"</div>");
    })
})

socket.on('server-send-all-user', function(data){
    $('#messages').append("<div>"+data.username + ": " + data.content +"</div>")
})

socket.on('thong-bao-dang-chat', function(data){
    $('#thong-bao').html(data + " dang nhap");
})

socket.on('thong-bao-dang-stop', function(data){
    $('#thong-bao').html("");
})


$(document).ready(function(){
    $("#formRegister").show();
    $("#formMessage").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-register", $("#username").val());
    })
    
    $('#btnSend').click(function(){
        socket.emit('client-send-message', $('#messageContent').val())
    })

    $('#messageContent').focusin(function(){
        socket.emit('toi-dang-chat');
    })

    $('#messageContent').focusout(function(){
        socket.emit('toi-stop-chat');
    })

    $('#btnLogout').click(function(){
        socket.emit('client-logout');
        $("#formMessage").hide();
    })
})
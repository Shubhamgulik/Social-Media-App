module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    console.log("Check 1")
    //2: It receives an "connection" event from client and sends acknowledgement/emits "connect" event to client
    io.sockets.on('connect',function(){
        console.log('New connection received ',socket.id);

        
    })
}
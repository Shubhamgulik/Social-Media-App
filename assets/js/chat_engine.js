class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // As soon as class is initiallized it sends an connection request
        //1: It emits an "connect" event to server/observer
        this.socket = io.connect('http://localhost:5000');

        if(userEmail){
            this.connectionHandler();
        }
    }


    connectionHandler(){
        //3: It receives "connect event" from server/observer that it is connected/established
        this.socket.on('connect',function(){
            console.log("connection successfully established ...");
        })
    }
}
import WebSocket = require("ws");


export class cuisineListener {

    socket:any;
    //socket:WebSocket.WebSocket
    constructor(){

    }


    startListening(){

        this.socket.on('message', (message:string) => {
        this.socket.send('peroquet : '+ message);

        });

    }

    setSocket(socket:WebSocket.WebSocket){
        this.socket = socket; 
    }

    sendMessage(message:string){

        this.socket.send(message)
    }


}
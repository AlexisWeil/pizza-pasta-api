import { any, object } from "zod";
import { clientSocket } from "./modele";
import WebSocket = require("ws");



export class ClientService{

    clientList:Array<any> ;

    constructor(){

        this.clientList = []



    }

    saveClient(userName:string, role:number, socket:any){

        this.clientList.push([userName, 
                                {
                                role : role,
                                socket : socket
                                }
                            ])
        console.log(this.clientList)
    }

    getClientFromName(username:String){
       return  this.clientList.map((client) => {

            if (client.userName = username)
                return client
        })
    }

    // cuisineListener(socket:WebSocket.WebSocket, data:any){

    //     const cuisineClient = clientService.getClientFromName(data.nom)
    //     cuisineClient[1].socket.on('commande', (commande:Commande) => {

    //     cuisineClient[1].socket.send('peroquet : '+ commande);
    //     });

    // }


}

const clientService = 
    new ClientService()

    export default clientService;
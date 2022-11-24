import { number } from "zod";
import {WebSocketServer} from 'ws';
import * as express from 'express';
import { Express, Request } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import clientService from "./clientService";
import { cuisineListener } from "./CuisineListener";


export const CL = new cuisineListener()
export const wsServer = (app:Express, port:number) => {


const server = app.listen(port, () => {
        console.log('Server listening on port ' + port)
      })
      
const wss = new WebSocketServer({clientTracking: false, noServer: true})
    
server.on('upgrade', (req, socket, head) => {   
    wss.handleUpgrade(req, socket, head, (socket) => { 
        // HTTP ---> WebSocket    wss.emit('connection', socket, req);        
         // Acceptation de la connexion  });});
         wss.emit('connection', socket, req); 
    });
  });
  
  
  wss.on('connection', (socket, req) => {

    const token = req.headers["x-auth-token"];
    const Jtoken = JSON.parse(JSON.stringify(token))
    const data:any = jwt.verify(Jtoken, process.env['JWT_SECRET'] || 'secret');
    //console.log('token : ', data)
    //console.log("Socket : ",socket)
    //clientService.saveClient(data.nom, data.id_role, socket)
    if(data.nom === 'Cuisine'){
      CL.setSocket(socket)
      CL.startListening
    }
    
    
    


    socket.on('message', (message:string) => {

        socket.send('peroquet : '+ message);
    });
    socket.send('Bonjour cher ' + data.nom);

  })
  
}





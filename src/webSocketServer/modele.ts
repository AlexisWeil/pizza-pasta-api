import { WebSocket } from "ws"


export interface clientSocket {
    userName: string,
    info : sokectInfo
  }



export interface sokectInfo {
    role: number,
    socket:any
}
  
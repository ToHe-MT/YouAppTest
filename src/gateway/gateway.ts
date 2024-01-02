import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on('connection', (socket) => {
            // console.log(socket.id);
            // console.log("Connected");
        })
    }
    @SubscribeMessage('userB')
    onUserA(@MessageBody() body: any) {
        this.server.emit('userB',{
            msg:'to User B',
            content: body,
        });
    }

    @SubscribeMessage('userA')
    onUserB(@MessageBody() body: any) {
        this.server.emit('userA',{
            msg:'to User A',
            content: body,
        });
    }
}
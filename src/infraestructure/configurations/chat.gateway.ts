import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ParseJsonPipe } from 'src/application/pipes/ParseJSON.pipe';
import { SendMessageDTO } from '../../application/dtos';
import { SendMessage, GetUserByToken } from '../../application/use-cases';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  private users;

  constructor(private readonly sendMessage: SendMessage, private readonly getUserByToken: GetUserByToken) {
    this.users = [];
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody(new ParseJsonPipe()) payload: SendMessageDTO, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const recipientClient = this.users.find(({ userId }) => userId === payload.recipient);
      const newMessage = await this.sendMessage.exec(payload);

      if (!recipientClient) {
        this.logger.warn(`User recipient ${payload.recipient} not connected`);

        return;
      }

      client.to(recipientClient.clientId).emit('message', newMessage);
    } catch (error) {
      console.log(error);
    }
  }

  afterInit() {
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    const user = this.users.find(({ clientId }) => clientId === client.id);

    this.logger.warn(`User ${user.username} disconnected with clientID: ${user.clientId}`);
  }

  async handleConnection(client: Socket) {
    try {
      const clientId = client.id;
      const token = client?.handshake?.auth?.authorization || client?.handshake?.headers?.authorization;

      if (!token) client.disconnect();

      const userData = await this.getUserByToken.exec(token);

      this.users.push({ ...userData, clientId });

      this.logger.log(`User ${userData.username} connected with clientID: ${clientId}`);
    } catch (error) {
      this.logger.error(`User can't connect`);
    }
  }
}

import { Module } from '@nestjs/common';
import { Entities, Port } from '../../application/enums';
import { CreateChat, SendMessage } from '../../application/use-cases';
import { GetUserByToken } from '../../application/use-cases/GetUserByToken';
import { ChatSchema } from '../../domain/entities';
import { ChatGateway } from '../configurations';
import { ChatController } from '../constrollers';
import { OrmModule } from '../database/orm';
import { ChatRepository, UserRepository } from '../repositories';

@Module({
  imports: [OrmModule.forFeature([{ name: Entities.Chat, schema: ChatSchema }])],
  controllers: [ChatController],
  providers: [
    CreateChat,
    SendMessage,
    GetUserByToken,
    ChatGateway,
    {
      provide: Port.Chat,
      useClass: ChatRepository,
    },
    {
      provide: Port.User,
      useClass: UserRepository,
    },
  ],
})
export class ChatModule {}

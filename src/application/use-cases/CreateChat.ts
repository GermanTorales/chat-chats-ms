import { Inject, Injectable, Logger } from '@nestjs/common';
import { Chat } from 'src/domain/entities';
import { ChatTypes, Status, UserTypes } from 'src/domain/enums';
import { CreateChatDTO } from '../dtos';
import { Port } from '../enums';
import { IChatRepository } from '../repositories';

@Injectable()
export class CreateChat {
  private readonly logger = new Logger(CreateChat.name);

  constructor(@Inject(Port.Chat) private readonly chatRepository: IChatRepository) {}

  async exec(data: CreateChatDTO): Promise<Chat> {
    try {
      const { sender, recipient, message } = data;
      const chat = {
        owner: data.sender,
        participants: [
          { userId: sender, role: UserTypes.Sender },
          { userId: recipient, role: UserTypes.Recipient },
        ],
        conversations: [
          {
            message,
            sender,
            status: Status.Active,
          },
        ],
        status: Status.Active,
        type: ChatTypes.PrivateOneOnOne,
      };

      const newChat = await this.chatRepository.create(chat);

      return newChat;
    } catch (error) {}
  }
}

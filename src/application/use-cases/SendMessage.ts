import { Inject, Injectable } from '@nestjs/common';
import { Conversation } from '../../domain/entities/sub-entities';
import { Status } from '../../domain/enums';
import { SendMessageDTO } from '../dtos';
import { Port } from '../enums';
import { IChatRepository } from '../repositories';

@Injectable()
export class SendMessage {
  constructor(@Inject(Port.Chat) private readonly chatRepository: IChatRepository) {}

  async exec(data: SendMessageDTO): Promise<Conversation> {
    try {
      const { chatId, sender, message } = data;
      const chatFound = await this.chatRepository.findOne(chatId);

      if (!chatFound) return null;

      const newMessageToSend = { sender, message, status: Status.Active };
      chatFound.conversations.push(newMessageToSend);

      await this.chatRepository.update(chatId, chatFound);

      return newMessageToSend;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

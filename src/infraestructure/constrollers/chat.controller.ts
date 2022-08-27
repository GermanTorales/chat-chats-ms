import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateChatDTO } from '../../application/dtos';
import { CreateChat } from '../../application/use-cases';

@Controller('chats')
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  constructor(private createChat: CreateChat) {}

  @Post('')
  async create(@Body() data: CreateChatDTO) {
    try {
      const newChat = await this.createChat.exec(data);

      return { message: 'New chat created', data: newChat };
    } catch (error) {}
  }
}

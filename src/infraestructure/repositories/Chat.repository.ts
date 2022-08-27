import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entities } from '../../application/enums';
import { IChatRepository } from '../../application/repositories';
import { Chat, ChatDocument } from '../../domain/entities';

export class ChatRepository implements IChatRepository {
  constructor(@InjectModel(Entities.Chat) private readonly chatModel: Model<ChatDocument>) {}

  async create(data: Chat): Promise<Chat> {
    try {
      const chat = await this.chatModel.create(data);

      return chat;
    } catch (error) {
      throw error;
    }
  }

  async findOne(_id: string): Promise<Chat> {
    try {
      const chat = await this.chatModel.findOne({ _id });

      return chat;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: string, data: Chat): Promise<any> {
    try {
      const chatUpdated = await this.chatModel.updateOne({ _id }, data, { new: true });

      return chatUpdated;
    } catch (error) {
      throw error;
    }
  }
}

import { Chat } from '../../domain/entities';

export interface IChatRepository {
  create: (data: Chat) => Promise<Chat>;
  findOne: (_id: string) => Promise<Chat>;
  update: (_id: string, data: Chat) => Promise<Chat>;
}

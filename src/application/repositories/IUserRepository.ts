import { IUser } from '../../domain/entities';

export interface IUserRepository {
  me: (token: string) => Promise<IUser>;
}

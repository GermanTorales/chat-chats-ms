import { Logger } from '@nestjs/common';
import { makeRequest } from '../helpers';
import { IUser } from '../../domain/entities';
import { IUserRepository } from '../../application/repositories';

export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);

  async me(token: string): Promise<IUser> {
    try {
      const headers = { Authorization: token };
      const method = 'GET';
      const url = `${process.env.USERS_MS_URL}/users/me`;

      const response = await makeRequest(url, method, null, headers);

      return response;
    } catch (error) {
      throw error;
    }
  }
}

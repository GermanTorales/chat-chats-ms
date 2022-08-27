import { Inject, Injectable } from '@nestjs/common';
import { Port } from '../enums';
import { IUserRepository } from '../repositories';

@Injectable()
export class GetUserByToken {
  constructor(@Inject(Port.User) private readonly userRepository: IUserRepository) {}

  async exec(token: string) {
    try {
      const user = await this.userRepository.me(token);

      return user;
    } catch (error) {
      throw error;
    }
  }
}

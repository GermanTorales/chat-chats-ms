import { IsNotEmpty } from 'class-validator';

export class CreateChatDTO {
  @IsNotEmpty()
  sender: string;

  @IsNotEmpty()
  recipient: string;

  @IsNotEmpty()
  message: string;
}

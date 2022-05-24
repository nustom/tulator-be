import { Message } from 'src/models/entities/Messages';
import { ICreateMessageBody } from '../interfaces';

type MessageExt = {
  message: Message;
  children: Message[];
};

export interface IMessageRepository {
  getAll(): Promise<MessageExt[]>;
  create(payload: ICreateMessageBody): Promise<Message>;
}

import { Message } from 'src/models/entities/Messages';
import { ICreateMessageBody } from '../interfaces';

export interface IMessageRepository {
  getAll(): Promise<Message[]>;
  create(payload: ICreateMessageBody): Promise<Message>;
}

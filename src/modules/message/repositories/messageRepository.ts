import { IMessageRepository } from './messageRepository.interface';
import { logger } from '../../../helpers/logger';
import { Message } from '../../../models/entities/Messages';
import { EntityManager, getManager, Repository, TreeRepository } from 'typeorm';
import { ICreateMessageBody } from '../interfaces';

class MessageRepository implements IMessageRepository {
  private manager: EntityManager;
  private repo: TreeRepository<Message>;
  constructor() {
    this.manager = getManager();
    this.repo = this.manager.getTreeRepository(Message);
  }

  async getAll(): Promise<Message[]> {
    return await this.repo.findTrees({
      relations: ['parent']
    });
  }

  async create(payload: ICreateMessageBody): Promise<Message> {
    try {
      const message = new Message();

      if (payload.parentId) {
        const parent = await this.repo.findOne(payload.parentId);
        message.parent = parent;
      }

      message.author = payload.author;
      message.content = payload.content;
      const newMessage = await this.repo.save(message);
      return newMessage;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}

export default MessageRepository;

import { IMessageRepository } from './messageRepository.interface';
import { Message } from '../../../models/entities/Messages';
import { EntityManager, getManager, TreeRepository } from 'typeorm';
import { ICreateMessageBody } from '../interfaces';

class MessageRepository implements IMessageRepository {
  private manager: EntityManager;
  private repo: TreeRepository<Message>;

  constructor() {
    this.manager = getManager();
    this.repo = this.manager.getTreeRepository(Message);
  }

  async getAll(): Promise<Message[]> {
    try {
      return await this.repo.findTrees({
        relations: ['parent']
      });
    } catch (error) {
      throw error;
    }
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
      return await this.repo.save(message);
    } catch (error) {
      throw error;
    }
  }
}

export default MessageRepository;

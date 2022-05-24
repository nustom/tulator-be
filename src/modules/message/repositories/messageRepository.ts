import { IMessageRepository } from './messageRepository.interface';
import { logger } from '../../../helpers/logger';
import { Message } from '../../../models/entities/Messages';
import { EntityManager, getManager, Repository } from 'typeorm';
import { ICreateMessageBody } from '../interfaces';

type MessageExt = {
  message: Message;
  children: Message[];
};

class MessageRepository implements IMessageRepository {
  private manager: EntityManager;
  private repo: Repository<Message>;
  constructor() {
    this.manager = getManager();
    this.repo = this.manager.getRepository(Message);
  }

  async getAll(): Promise<MessageExt[]> {
    const parent: Message[] = await this.repo.find({
      where: { parent: null },
      relations: ['children', 'children.children', 'parent', 'children.parent']
    });

    const result: MessageExt[] = [];
    const s: any[] = [];

    for (const p of parent) {
      const child: Message[] = [];
      let a = p.children;

      if (a) {
        child.push(a);
        while(a && a.children !== null) {
          child.push(a);

          a = a.children;
        }
      }

      const c: MessageExt = {
        message: p,
        children: child
      };

      result.push(c);
      s.push({
        ...c.message,
        topics: c.children
      })
    }

    return s;
  }

  async create(payload: ICreateMessageBody): Promise<Message> {
    try {
      const message = new Message();

      let parent = null;

      if (payload.parentId) {
        parent = await this.repo.findOne(payload.parentId);
      }

      message.author = payload.author;
      message.parent = parent;
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

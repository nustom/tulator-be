import { Request, Response, Router } from 'express';
import { Message } from '../../models/entities/Messages';
import { IRouter } from '../router.interface';
import { ICreateMessageBody } from './interfaces';
import MessageRepository from './repositories/messageRepository';

const router = Router();
class MessageRouter implements IRouter {
  get routes() {
    router.get('/', async (_req: Request, res: Response): Promise<Response> => {
      try {
        const messageRepo: MessageRepository = new MessageRepository();
        const messages: Message[] = await messageRepo.getAll();

        return res.status(200).json({ data: messages });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    });

    router.post('/', async (req: Request, res: Response): Promise<Response> => {
      try {
        const { parentId, author, content } = req.body;
        const messageData: ICreateMessageBody = {
          parentId,
          author,
          content
        }

        const messageRepo: MessageRepository = new MessageRepository();
        const message: Message = await messageRepo.create(messageData);

        return res.status(200).json({ data: message });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    });

    return router;
  }
}

export default new MessageRouter();

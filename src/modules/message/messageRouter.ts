import { Request, Response, Router } from 'express';
import { IRouter } from '../router.interface';
import MessageRepository from './repositories/messageRepository';
import { transformGetAllResponse } from './messageHelper';

const router = Router();
class MessageRouter implements IRouter {
  get routes() {
    router.get('/', async (_req: Request, res: Response) => {
      try {
        const messageRepo = new MessageRepository();
        const messages = await messageRepo.getAll();

        console.log('MMMMMMMMM', messages);

        const result = transformGetAllResponse(messages);
        return res.status(200).json({ data: result });
      } catch (err) {
        throw err;
      }
    });

    router.post('/', async (req: Request, res: Response) => {
      try {
        const { parentId, author, content } = req.body;
        const messageRepo = new MessageRepository();

        const message = await messageRepo.create({ parentId, author, content });

        return res.status(200).json({ message });
      } catch (err) {
        throw err;
      }
    });

    return router;
  }
}

export default new MessageRouter();

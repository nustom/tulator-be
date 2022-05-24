import { Router } from 'express';
import { IRouter } from './router.interface';
import userRouter from './user/userRouter';
import messageRouter from './message/messageRouter';

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    router.use('/users', userRouter.routes);
    router.use('/messages', messageRouter.routes);
    return router;
  }
}

export default new BaseRouter();

import { Router } from 'express';
import { IRouter } from './router.interface';
import userRouter from './user/userRouter'

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    router.use('/users', userRouter.routes);
    return router;
  }
}

export default new BaseRouter();

import { Router } from 'express';
import { signIn,  getUserMe, getRanking } from '../controllers/usersController.js';
//import { validateCategory } from '../middlewares/categoryValidator.js';

const categoryRouter = Router();

usersRouter.post('/signin', signIn);
usersRouter.get('/users/me', getUserMe);
usersRouter.get('/ranking', getRanking);

//acrescerntar middlewares nas rotas.

export default categoryRouter;
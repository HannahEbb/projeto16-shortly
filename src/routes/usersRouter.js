import { Router } from 'express';
import { signUp, signIn,  getUserMe, getRanking } from '../controllers/usersController.js';
import { signupValidate } from '../middlewares/signupValidate';
import { signinValidate } from '../middlewares/signinValidate';

const categoryRouter = Router();

usersRouter.post('/signup', signupValidate, signUp);
usersRouter.post('/signin', signinValidate, signIn);
usersRouter.get('/users/me', getUserMe);
usersRouter.get('/ranking', getRanking);


export default categoryRouter;
import { Router } from 'express';
import { signUp, signIn } from '../controllers/usersController.js';
//import { signUp, signIn,  getUserMe, getRanking } from '../controllers/usersController.js';
import { signupValidate } from '../middlewares/signupValidate.js';
import { signinValidate } from '../middlewares/signinValidate.js';

const usersRouter = Router();

usersRouter.post('/signup', signupValidate, signUp);
usersRouter.post('/signin', signinValidate, signIn);
//usersRouter.get('/users/me', getUserMe);
//usersRouter.get('/ranking', getRanking);


export default usersRouter;
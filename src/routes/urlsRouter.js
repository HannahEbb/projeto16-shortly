import { Router } from 'express';
import { createUrl, getUrlById, getShortUrl, deleteUrlById } from '../controllers/urlsController.js';
//import { validateCategory } from '../middlewares/categoryValidator.js';

const categoryRouter = Router();

urlsRouter.post('/urls/shorten', createUrl);
urlsRouter.get('/urls/:id', getUrlById);
urlsRouter.get('/urls/open/:shortUrl', getShortUrl);
urlsRouter.delete('/urls/:id', deleteUrlById);

//acrescerntar middlewares nas rotas.

export default categoryRouter;
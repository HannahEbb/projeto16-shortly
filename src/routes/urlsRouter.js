import { Router } from 'express';
import { createUrl, getUrlById, getShortUrl, deleteUrlById } from '../controllers/urlsController.js';
import { urlValidate } from '../middlewares/urlValidate';

const categoryRouter = Router();

urlsRouter.post('/urls/shorten', urlValidate, createUrl); //auth no controller (verifica se é a pessoa)
urlsRouter.get('/urls/:id', getUrlById);
urlsRouter.get('/urls/open/:shortUrl', getShortUrl);
urlsRouter.delete('/urls/:id', deleteUrlById); //auth no controller (Verifica se é a pessoa)


export default categoryRouter;
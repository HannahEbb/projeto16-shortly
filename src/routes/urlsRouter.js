import { Router } from 'express';
import { createUrl } from '../controllers/urlsController.js';
//import { createUrl, getUrlById, getShortUrl, deleteUrlById } from '../controllers/urlsController.js';
import { urlValidate } from '../middlewares/urlValidate.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', urlValidate, createUrl); //auth no controller 
//urlsRouter.get('/urls/:id', getUrlById);
//urlsRouter.get('/urls/open/:shortUrl', getShortUrl);
//urlsRouter.delete('/urls/:id', deleteUrlById); //auth no controller 


export default urlsRouter;
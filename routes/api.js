// c:\Users\ADMIN\Desktop\Node js\formapp_db\routes\api.js
import express, { Router } from 'express';
import { getClientDetails, updateClient, getAllClients, createClient, deleteClient } from '../controllers/client.controller.js';

const apiRouter = Router();

apiRouter.post('/create', createClient);

apiRouter.get('/', getAllClients);

apiRouter.get('/:id', getClientDetails);
apiRouter.put('/:id', updateClient);

apiRouter.delete('/:id', deleteClient);

export default apiRouter;

import type { Request, Response, NextFunction } from 'express';
import      { APIResponse       } from '../../common/utils/api.response.js';
import * as service               from './user.service.js';

// signup function
export async function signup(req: Request, res: Response, next: NextFunction){
  try{
    const { username, password } = req.body;
    const token = await service.signup(username, password);
    
    return res.status(201).json(APIResponse.success('Utente creato', {token}));
  }
  catch(error){ next(error); }
}

// login function
export async function login(req: Request, res: Response){
  //TODO
}

// information retrieval function
export async function getInfo(req: Request, res: Response){
   //TODO
}
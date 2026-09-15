import type { Request, Response } from 'express';
import * as service from './user.service.js';
import { APIResponse } from '../../common/utils/api.response.js';

//signup function
export async function signup(req: Request, res: Response){
  try{
    const { username, password } = req.body;
    const token = await service.signup(username, password);

    return res.status(201).json(APIResponse.success('Utente creato', {token}));
  }
  catch(error){}
}

//login function
export async function login(req: Request, res: Response){
  //TODO
}

export async function getInfo(req: Request, res: Response){
   
}
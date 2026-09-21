import type { Request, Response, NextFunction } from 'express';
import      { APIResponse                     } from '../../common/utils/api.response.js';
import      { AppError                        } from '../../common/errors/app.error.js';
import * as service                             from './user.service.js';

// signup function
export async function signup(req: Request, res: Response, next: NextFunction){
  try{
    const {username, password} = req.body;
    const token = await service.signup(username, password);
    return res.status(201).json(APIResponse.success('User created', {token}));
  }
  catch(error){ next(error); }
}

// login function
export async function login(req: Request, res: Response, next: NextFunction){
  try {
    const {username, password} = req.body;
    const token = await service.login(username, password);
    
    return res.status(200).json(APIResponse.success('Access done', {token}));
  }
  catch(error){ next(error); }
}

// information retrieval function
export async function getInfo(req: Request, res: Response, next: NextFunction){
  try{
    const {id} = req.params;
    if(!id || typeof id !== 'string'){ throw new AppError('User does not exists', 400); }
    const userdata = await service.getInfo(id);

    return res.status(200).json(APIResponse.success('Informations retrieved', userdata));
  }
  catch(error){ next(error); }
}
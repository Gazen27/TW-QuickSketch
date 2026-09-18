import 'dotenv/config';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import      { AppError        } from '../errors/app.error.js';

const SECRET = process.env.JWT_SECRET as string;

export function createToken(userId : string) : string{
  return jwt.sign(
    {userId}, process.env.JWT_SECRET!, {expiresIn: '1h'}
  );
}

export function getToken(authorization : string | undefined): string {
  const [scheme, token] = authorization?.split(' ') ?? [];
  if(scheme !== 'Bearer' || !token) throw new AppError('Non autorizzato', 401);
  
  return token;
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, SECRET) as JwtPayload;
  if(!payload.sub) throw new AppError('Non autorizzato', 401);

  return payload.sub;
}
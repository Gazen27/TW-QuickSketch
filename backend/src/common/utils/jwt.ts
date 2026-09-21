import 'dotenv/config';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import      { AppError        } from '../errors/app.error.js';

const SECRET = process.env.JWT_SECRET as string;

// token creation
export function createToken(userId : string) : string{
  return jwt.sign(
    {sub: userId}, SECRET, {expiresIn: '1h'}
  );
}

// extracting token from a request
export function getToken(authorization : string | undefined): string {
  const [scheme, token] = authorization?.split(' ') ?? [];
  if(scheme !== 'Bearer' || !token) throw new AppError('Not authorized', 401);
  
  return token;
}

// token verification
export function verifyToken(token: string) {
  const payload = jwt.verify(token, SECRET) as JwtPayload;
  if(!payload.sub) throw new AppError('Not authorized', 401);

  return payload.sub;
}
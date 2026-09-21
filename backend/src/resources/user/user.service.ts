import bcrypt            from 'bcrypt';
import { compare       } from 'bcrypt';
import { prisma        } from '../../common/utils/prisma.js';
import { AppError      } from '../../common/errors/app.error.js';
import { createToken } from '../../common/utils/jwt.js';

// sketch-counter increment
export async function incrementSketchCount(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { sketchCount: {increment: 1} }
  });
}

// account creation service
export async function signup(username : string, password : string){
  
  const existingUser = await prisma.user.findUnique({where: {username}});
  if(existingUser){throw new AppError('Username already exists', 409);}
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {username, password: hashedPassword};
  const user = await prisma.user.create({data: userData});

  const token = createToken(user.id);
  return token;
}

// account login service
export async function login(username : string, password : string){
  const user = await prisma.user.findUnique({where: {username}});
  if(!user || !(await compare(password, user.password))){
    throw new AppError('Incorrect username or password', 401);}

  return createToken(user.id);
}

// account information retrieval service
export async function getInfo(id : string){
  const user = await prisma.user.findUnique({
    where: {id},
    select: {
      id: true,
      username: true,
      sketchCount: true,
      drawingScore: true,
      guessedScore: true
    }
  });

  if(!user){ throw new AppError('User not found', 404) }

  return user;
}
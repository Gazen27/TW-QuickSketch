import bcrypt            from 'bcrypt';
import { compare       } from 'bcrypt';
import { prisma        } from '../../common/utils/prisma.js';
import { AppError      } from '../../common/errors/app.error.js';
import { createToken } from '../../common/utils/jwt.js';

// account creation service
export async function signup(username : string, password : string){
  
  const existingUser = await prisma.user.findUnique({where: {username}});
  if(existingUser){throw new AppError('Username già esistente', 409);}

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
    throw new AppError('Nome utente o password errati', 401);}

  return createToken(user.id);
}

// account information retrieval service  //da finire / controllare
export async function getInfo(id : string){
  return prisma.user.findUnique({where: {id}});
}
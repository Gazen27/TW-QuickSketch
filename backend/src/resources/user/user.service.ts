import { compare } from 'bcrypt';
import { prisma  } from '../../common/utils/prisma.js';

// account creation service
export async function signup(username : string, password : string){

}

// account login service
export async function login(username : string, password : string){
  const user = await prisma.user.findUnique({where: {username}});
  if(!user || !(await compare(password, user.password))) { throw new Error; }
  
  return createToken(user.id);
}

// account information retrieval service
export async function getInfo(id : string){
  return prisma.user.findUnique({where: {id}});
}
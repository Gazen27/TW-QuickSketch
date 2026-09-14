import { compare } from 'bcrypt';
import { prisma } from '../../common/utils/prisma.js';

export async function signup(username : string, password : string){

}

export async function login(username : string, password : string){
  const user = await prisma.user.findUnique({where: {username}});
  if(!user || !(await compare(password, user.password))) { throw new Error; }
  
  return createToken(user.id);
}

//
export async function getInfo(id : String){
  return prisma.user.findUnique({where: {id}});
}
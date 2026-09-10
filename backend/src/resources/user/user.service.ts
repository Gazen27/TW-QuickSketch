import { compare } from 'bcrypt';
import { prisma } from '../../common/utils/prisma.js';



export async function login(username : string, password : string){
  const user = await prisma.user.findUnique({where: {username}});
  if(!user || !(await compare(password, user.password))) { throw new Error; }
  
  return createToken(user.id);
}
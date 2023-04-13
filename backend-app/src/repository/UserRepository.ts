import prismaClient from "../config/prismaClient";
import { hash } from "bcryptjs";

interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
  }

export class UserRepository{
     async findByEmail(email: string) : Promise<User | null>{
        return await prismaClient.user.findFirst({
            select:{
                id:true,
                name:true,
                email:true,
                password: true
            },
            where: { email }
})}

    async createUser(name: string, email: string, password: string) : Promise<User>{
        const passwordHash = await hash(password, 8);
        return await prismaClient.user.create({
            select:{
                id:true,
                name:true,
                email:true
            },
            data:{
                name: name,
                email: email,
                password: passwordHash,
            }
})}

    async findUserById(id: number) : Promise<User | null>{
            return await prismaClient.user.findUnique({
                select:{
                    id:true,
                    name:true,
                    email:true
                },
                where:{
                    id: id
                }
            })}

    async deleteUserById(userId: number) : Promise<User>{
        return await prismaClient.user.delete({
            where: {
                id: userId
            }
        });
    }

    async updateUser(user: User) : Promise<User>{
        return prismaClient.user.update({
            where:{
                id: user.id
            },
            data:{
                name: user.name,
                email: user.email,
                password: user.password,
            }
        })
    }
}
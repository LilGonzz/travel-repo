import { compare } from "bcryptjs";
import { SessionRequest } from "../interfaces/Request";
import { UserRepository } from "../repository/UserRepository";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/token";

const userRepository = new UserRepository();
export class SessionService{
    async execute({ email, password } : SessionRequest){

        const user =  await userRepository.findByEmail(email);

        if(!user){
            throw new Error("email/senha inválido")
        }

        const passwordMatch = await compare(password, user.password)
        
        if(!passwordMatch){
            throw new Error("email/senha inválido")
        }
        
        const token = sign(
            {
                name: user.name,
                email: user.email
            }, 
            JWT_SECRET,
            {
                subject: user.id.toString(),
                expiresIn: '5d' 
            }
        )
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };

    }

    async getUserDetails(userId: number){
        return await userRepository.findUserById(userId);
    }
}
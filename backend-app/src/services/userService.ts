import { User } from "@prisma/client";
import { UserRequest } from "../interfaces/Request";
import { UserResponse } from "../interfaces/Response";
import { UserRepository } from "../repository/UserRepository";
 
const userRepository = new UserRepository();
export class UserService{
    
    public async createUser({name, email, password}: UserRequest){
        const emailValid = await this.checkEmailValid(email);
        if(!emailValid){
            throw new Error("email inválido ou existente");
        }

        const user = await userRepository.createUser(name, email, password)

        return await user;
    }

    public async getUserById(id: string){
        try{
            const numberId = parseInt(id);
            const user = await userRepository.findUserById(numberId);
            return user;
        } catch(error){
            throw new Error("id não é válido")
        }
    }

    public async updateUserById({ name, email, password }: UserRequest, userId: number){
        
        if(email){
            const emailValid = await this.checkEmailValid(email);
            if(!emailValid){
                throw new Error("email inválido ou já existente");
            }
        }
        
        const user = userRepository.findUserById(userId);
        user.then( user => {
            if(!user){
                throw new Error("usuário não encontrado")
            }

            if(name){
                user.name = name;
            }
            if(email){
                user.email = email;
            }
            if(password){
                user.password = password.toString();
            }
            
            return userRepository.updateUser(user);
        })
    }

    public async deleteUserById(userId: number){
        return await userRepository.deleteUserById(userId);
    }

    public async checkEmailValid(email: string) : Promise<boolean>{
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!email){
            return false; 
        }
        const exist = await userRepository.findByEmail(email);
        
        if(!regex.test(email) || exist){
            return false;
        }

        return true;
    }

}
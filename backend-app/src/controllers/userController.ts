
import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController{
    async createUser(req:Request, res:Response) {
        const { name, email, password } = req.body;
        const user = await userService.createUser({name, email, password});
        return res.json({ user });
    }

    async getUserById(req:Request, res:Response){
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        return res.json({ user });
    }
    
    async updateUserById(req:Request, res:Response){
            const userId = parseInt(req.params.id);
            const { name, email, password } = req.body;
            const user = await userService.updateUserById({ name, email, password }, userId);
            return res.json({ user });
    }

    async deleteUserById(req:Request, res:Response){
        const userId = parseInt(req.params.id);
        const user = await userService.deleteUserById(userId);
        return res.json({ user });
    }
    

}


import { SessionService } from "../services/sessionService";
import { Request, Response } from "express";

const sessionService = new SessionService();
export class SessionController{
    async handle(req: Request, res: Response){
        const {email, password} = req.body;
        const sessionValid = await sessionService.execute({ email, password });
        return res.json({sessionValid})
    }

    async getUserDetails(req: Request, res: Response){
        const userId = parseInt(req.user_id);

        const user = await sessionService.getUserDetails(userId);

        return res.json(user)

    }
}
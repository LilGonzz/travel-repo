import { Request, Response } from "express";
import { NextFunction } from "express";
import { JWT_SECRET } from "../config/token";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}

export function AthenticationMidd(req:Request, res:Response, next:NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try{
    
        const { sub }  = verify(token, JWT_SECRET) as Payload
        req.user_id = sub;
        
        return next();
    
    }catch(err){
        return res.status(401).end();
    }
}
import { Request, Response } from "express";
import { TravelService } from "../services/travelService";
import { StopRequest } from "../interfaces/Request";

const travelService = new TravelService();

export class TravelController{
    async getTravelById(req:Request, res:Response){
        const id = parseInt(req.params.id);
        const travel = await travelService.getTravelById(id);
        return res.json({travel})
    }

    async getAllTravelByUserId(req:Request, res:Response){
        const userId = parseInt(req.user_id);
        const travel = await travelService.getAllTravelByUserId(userId);

        return res.json({travel})
    }

    async getAllActivesTravelByUserId(req:Request, res:Response){
        const userId = parseInt(req.user_id);
        const travel = await travelService.getAllActivesTravelByUserId(userId);

        return res.json({travel})
    }

    async createTravel(req:Request, res:Response){
        const userId = parseInt(req.user_id);
        const travelStops: StopRequest[] = req.body.stops;
        
        const travel = await travelService.createTravel(userId, travelStops);

        return res.json({travel})
    
    }

    async deleteTravelById(req:Request, res:Response){
        const travelId = parseInt(req.params.id);

        const travel = await travelService.deleteTravel(travelId);

        return res.json({travel});

    }

    async updateTravelById(req:Request, res:Response){
        const userId = parseInt(req.user_id);
        const travelId = parseInt(req.params.id);
        const travelStops: StopRequest[] = req.body.stops;

        const travel = await travelService.updateTravel(travelId, travelStops)
    }
}
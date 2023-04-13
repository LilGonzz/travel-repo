import { Travel } from "@prisma/client";
import prismaClient from "../config/prismaClient";
import { StopRequest } from "../interfaces/Request";

export class TravelRepository{
    async getTravelById(id: number) : Promise<Travel | null>{
            return await prismaClient.travel.findFirst({
                where:{
                    id: id
            }})}

    async getAllTravelByUserId(userId: number){
            return await prismaClient.travel.findMany({
                where:{
                    user_id: userId,
            }})}

    async getAllActivesTravelByUserId(userId: number){
        return await prismaClient.travel.findMany({
            where:{
                user_id: userId,
                isActive: true
        }})}

    async createTravel(userId: number, distanceTime: number){
        return await prismaClient.travel.create({
            data:{
                distanceTime: distanceTime,
                isActive: true,
                user: {
                    connect:{
                        id: userId,
            }}}})}

    async addStops(travelStops: StopRequest[], travelId: number){
        let stopPromises: Promise<StopRequest>[] = [];
        
        console.log(travelStops);
        
        try{
            for(let x = 0; x <= travelStops.length - 1; x++){
                let stopPromise = prismaClient.stop.create({
                data:{
                    latitude: travelStops[x].latitude.toString(),
                    longitude: travelStops[x].longitude.toString(),
                    position: travelStops[x].position,
                    cityName: travelStops[x].cityName,
                    isReplacedOrDeleted: false,
                    travel: {
                    connect:{
                        id:travelId,
                    }
                    }
                }
                });
            
                stopPromises.push(stopPromise);
            }
            
            return await Promise.all(stopPromises);
        }catch(err){
            console.log(err)
            throw new Error("num funcionou")
            
        }        
        
        }

    async getStopsByTravelId(travelId: number){
        return await prismaClient.stop.findMany({
            where:{
                travel_id: travelId,
                isReplacedOrDeleted: false
            },
            orderBy:{
                position: 'asc'
            }
        })
    }

    async deleteTravel(travelId: number){
        return await prismaClient.travel.update({
            where:{
                id: travelId
            },
            data:{
                isActive: false
            }

        })
    }

    async softDeleteStopsByTravelId(travelId: number){
        await prismaClient.stop.updateMany({
            where:{
                travel_id: travelId
            },
            data:{
                isReplacedOrDeleted: true
            }
        })
    }

    async deleteStops(){
        await prismaClient.stop.deleteMany({
            where:{
                isReplacedOrDeleted: true
            }
        })
    }

    async getAllTravelInactive(){
        return await prismaClient.travel.findMany({
            where:{
                isActive: false
            }
        })
    }

    async deleteStopsFromInactiveTravels(travelId: number){
        await prismaClient.stop.deleteMany({
            where:{
                travel_id: travelId
        }})
    }

    async deleteInactiveTravels(travelId: number){
        await prismaClient.travel.delete({
            where:{
            id: travelId
        }})
    }
}
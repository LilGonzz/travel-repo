import { API_KEY_ORS } from "../config/token";
import { StopRequest } from "../interfaces/Request";
import { TravelResponse } from "../interfaces/Response";
import { TravelRepository } from "../repository/TravelRepository"

const travelRepository = new TravelRepository()
export class TravelService{

    async getTravelById(travelId: number){
        const travel = await travelRepository.getTravelById(travelId);
        let stopArr = await travelRepository.getStopsByTravelId(travelId);
        return { id: travelId, distanceTime: travel.distanceTime, stops: stopArr }
    }

    async getAllTravelByUserId(userId: number){
        const travel = await travelRepository.getAllTravelByUserId(userId);
        let travelWithStop: TravelResponse[] = [];
    
        for(let x = 0; x <= travel.length - 1; x++ ){
            let stopArr = await travelRepository.getStopsByTravelId(travel[x].id);
            travelWithStop.push({
                id: travel[x].id,
                distanceTime: travel[x].distanceTime,
                stops: stopArr,
                isActive: travel[x].isActive
            })
        };
        
        return travelWithStop;
    }

    async getAllActivesTravelByUserId(userId: number){
        const travel = await travelRepository.getAllActivesTravelByUserId(userId);
        let travelWithStop: TravelResponse[] = [];
    
        for(let x = 0; x <= travel.length - 1; x++ ){
            let stopArr = await travelRepository.getStopsByTravelId(travel[x].id);
            travelWithStop.push({
                id: travel[x].id,
                distanceTime: travel[x].distanceTime,
                stops: stopArr,
                isActive: travel[x].isActive
            })
        };
        
        return travelWithStop;
    }
    
    async createTravel(userId: number, travelStops: StopRequest[]){
        const distanceTime = await this.timeToTravel(travelStops)
        const travel = await travelRepository.createTravel(userId, distanceTime)
        const stops = await travelRepository.addStops(travelStops, travel.id)
        
        return {travel, stops};
    }

    async deleteTravel(travelId: number){
        return await travelRepository.deleteTravel(travelId);
    }

    async updateTravel(travelId: number, travelStops: StopRequest[]){
        await travelRepository.softDeleteStopsByTravelId(travelId);
        const travel = await travelRepository.getTravelById(travelId);
        travel.distanceTime = await this.timeToTravel(travelStops);
        const stops = await travelRepository.addStops(travelStops, travelId);
        return {travel, stops};
    }


    private async timeToTravel(travelStops: StopRequest[]){

        const originLat = travelStops[0].latitude;
        const originLon = travelStops[0].longitude;
        const destinyLat = travelStops[travelStops.length - 1].latitude
        const destinyLon = travelStops[travelStops.length - 1].longitude

        const stopString = travelStops.slice(1, -1).map(stop => `${stop.longitude},${stop.latitude}`).join('/');
        const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY_ORS}&start=${originLon},${originLat}&end=${destinyLon},${destinyLat}&intermediate=${stopString}`);
  
        const data = await response.json();
        const timeDistance = data.features[0].properties.segments[0].duration;
        return await timeDistance / 3600;
    }

    async removeStopReplacedOrDeleted(){
       await travelRepository.deleteStops();
    }

    async hardDeleteTravelInactive(){
        const inactiveTravels = await travelRepository.getAllTravelInactive();
        inactiveTravels.forEach(async element => {
            await travelRepository.deleteStopsFromInactiveTravels(element.id);
            await travelRepository.deleteInactiveTravels(element.id)
        });
    }
}

export interface UserResponse{
    name: string,
    email: string
}

export interface TravelResponse{
    id: number,
    stops: Stop[],
    distanceTime: number
    isActive: boolean
}

export interface Stop{
    latitude: string,
    longitude: string,
    position: number,
    cityName: string
}
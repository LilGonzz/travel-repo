export interface UserRequest{
    name: string,
    email: string,
    password: string
}
export interface SessionRequest{
    email: string,
    password: string
}

export interface TravelResponse{
    id: number,
    stops: StopRequest[],
    distanceTime: number
}
export interface StopRequest{
    latitude: string,
    longitude: string,
    position: number,
    cityName: string
}

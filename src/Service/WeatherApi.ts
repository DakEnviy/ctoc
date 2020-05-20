import { apiKey } from "../config";
import axios, { AxiosResponse } from "axios";

interface WeatherInterface {
    
}

export class WeatherApi {
    private request: string = 'https://api.openweathermap.org/data/2.5/weather/';
    private jsonWeather: AxiosResponse<any> | null;

    constructor() {
        this.jsonWeather = null;
    }

    public async getResponse(location: string, units: string = "metric") {
        this.jsonWeather = await axios.get(this.request, {
            params: {
                q: location,
                units: units,
                appid: apiKey,
            }
        })
        .catch(function(error) {
            if (error.response) {
                throw Error("Problems on server");
            } else if (error.request) {
            throw Error("Invalid config parameters");
            } else {
                throw Error("Unknown error");
            }
        })
        ; 
    }

    public getTemperature(): string {
        if (this.jsonWeather === null) {
            throw new Error("Response is empty");
        }
        return JSON.stringify(this.jsonWeather.data.main.temp);
    }
}
import { apiKey } from "../config";
import axios, { AxiosResponse } from "axios";
import {WeatherResponse} from "../interfaces/weatherModel";

export class WeatherApi {
    private static request: string = 'https://api.openweathermap.org/data/2.5/weather/';

    public static async makeRequest(location: string, units: string = "metric"): Promise<WeatherResponse> {
        return (await axios.get<WeatherResponse>(this.request, {
            params: {
                q: location,
                units: units,
                appid: apiKey,
            }
        })
        .catch(function(error: { response: any; request: any; }) {
            if (error.response) {
                throw Error("Some problems in the server");
            } else if (error.request) {
            throw Error("Invalid config parameters");
            } else {
                throw Error("Unknown error");
            }
        })).data;
    }
}
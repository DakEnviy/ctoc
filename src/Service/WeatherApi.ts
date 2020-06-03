import { config } from "../config";
import axios from "axios";
import { WeatherInterface } from "../interfaces/weatherModel";

export class WeatherApi {
    private static request: string = 'https://api.openweathermap.org/data/2.5/weather/';

    public static async makeRequest(location: string|undefined, units: string = "metric"): Promise<WeatherInterface> {
        return (await axios.get<WeatherInterface>(this.request, {
            params: {
                q: location,
                units: units,
                appid: config.apiKey,
            }
        })
            .then((response) => response.data)
            .catch(function(error) {
                if (error.response) {
                    throw Error(error.response.data.message);
                } else if (error.request) {
                    throw Error("Some server problems");
                } else {
                    throw Error("Unknown error");
                }
            }));
    }
}
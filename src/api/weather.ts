import axios from 'axios';

import { config } from '../config';

export interface WeatherApiResponse {
    main: {
        temp: number,
    },
    sys: {
        country: string,
    },
    name: string,
}

export class WeatherApi {
    private static request: string = 'https://api.openweathermap.org/data/2.5/weather/';

    public static async makeRequest(location: string, units: string = 'metric'): Promise<WeatherApiResponse> {
        try {
            const response = await axios.get<WeatherApiResponse>(WeatherApi.request, {
                params: {
                    q: location,
                    units: units,
                    appid: config.apiKey,
                },
            });

            return response.data;

        } catch (err) {
            if (err.response) {
                throw new Error(err.response.data.message);
            } else if (err.request) {
                throw new Error('Some server problems');
            } else {
                throw new Error('Unknown error');
            }
        }
    }
}
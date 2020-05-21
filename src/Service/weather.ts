import {WeatherApi} from "./weatherApi";

export class Weather {
    private temperature: number|null = null;

    private async update(location: string) {
        this.temperature = (await WeatherApi.makeRequest(location)).data.main.temp;
    }

    public getTemperature(): number|null {
        return this.temperature;
    }    
}
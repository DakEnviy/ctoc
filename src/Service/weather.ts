import { WeatherApi } from "./WeatherApi";
import { settings } from "../settings";

export class Weather {
    private temperature: number|null = null;

    private async update() {
        this.temperature = (await WeatherApi.makeRequest(settings.location)).data.main.temp;
    }

    public getTemperature(): number|null {
        return this.temperature;
    }    
}
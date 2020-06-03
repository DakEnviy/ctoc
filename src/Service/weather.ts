import { WeatherApi } from "./WeatherApi";
import { settings } from "../settings";

export class Weather {
    private temperature: number|null = null;

    public async update() {
        var response = await WeatherApi.makeRequest(settings.location);
        this.temperature = response.main.temp;
        if (this.temperature !== null) {
            this.temperature = Math.floor(this.temperature);
        }
    }

    public getTemperature(): number|null {
        return this.temperature;
    }    
}
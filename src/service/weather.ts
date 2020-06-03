import { WeatherApi } from "../api/weather";
import { settings } from "../settings";

export class Weather {
    private temperature: number | null = null;
    private onUpdateCallback?: () => void;

    public async update() {
        const response = await WeatherApi.makeRequest(settings.location);

        this.temperature = Math.round(response.main.temp);

        this.onUpdateCallback && this.onUpdateCallback();
    }

    public getTemperature(): number | null {
        return this.temperature;
    }    

    public onUpdate(callback: Weather['onUpdateCallback']) {
        this.onUpdateCallback = callback;
    }
}

export const weatherService = new Weather();

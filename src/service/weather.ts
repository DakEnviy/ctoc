import { window } from "vscode";

import { WeatherApi } from "../api/weather";
import { settings } from "../settings";

export class Weather {
    private static updateInterval: number = 10 * 1000;

    private errorMessage: string | null = null;
    private temperature: number | null = null;

    private updateTask?: NodeJS.Timeout;
    private onUpdateCallback?: () => void;

    public start() {
        this.updateTask = setInterval(() => {
            this.update();
        }, Weather.updateInterval);
    }

    public stop() {
        if (this.updateTask) {
            clearInterval(this.updateTask);
        }
    }

    public async update() {
        if (settings.location) {
            try {
                const response = await WeatherApi.makeRequest(settings.location);

                this.errorMessage = null;
                this.temperature = Math.round(response.main.temp);

            } catch (err) {
                this.errorMessage = err.message;
                this.temperature = null;

                window.showErrorMessage(`SkyWeather error: ${err.message}`);
            }
        }

        this.onUpdateCallback && this.onUpdateCallback();
    }

    public getErrorMessage(): string | null {
        return this.errorMessage;
    }

    public getTemperature(): number | null {
        return this.temperature;
    }    

    public onUpdate(callback: Weather['onUpdateCallback']) {
        this.onUpdateCallback = callback;
    }
}

export const weatherService = new Weather();

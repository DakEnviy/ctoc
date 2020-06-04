import { window, StatusBarAlignment, ExtensionContext } from 'vscode';

import { settings } from '../settings';
import { getCommandName } from '../utils/commands';
import { weatherService } from '../service/weather';
import { getIcon } from '../utils/icons';

export class WeatherStatusBar {

    public bar = window.createStatusBarItem(StatusBarAlignment.Right, -10);

    constructor() {
        this.update();
    }

    public update() {
        if (!settings.location) {
            this.show('No location', 'Update Settings', 'updateSettings');

        } else {
            const errorMessage = weatherService.getErrorMessage();
            const temperature = weatherService.getTemperature();
            const city = weatherService.getCity();
            const icon = getIcon(weatherService.getIconCode());

            if (errorMessage) {
                this.show(`Error: ${errorMessage}`, 'Update Settings', 'updateSettings');
            } else if (temperature) {
                this.show(`${icon} ${temperature} ℃`, `City: ${city}`, 'updateSettings');
            } else {
                this.show('Unknown state. Try to update settings.', 'Update Settings', 'updateSettings');
            }
        }
    }

    public show(text: string, tooltip?: string, command?: string) {
        this.bar.text = text;
        this.bar.tooltip = tooltip;
        this.bar.command = command && getCommandName(command);
        this.bar.show();
    }
}

export const statusBar = new WeatherStatusBar();

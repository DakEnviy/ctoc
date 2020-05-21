import { window, StatusBarAlignment, ExtensionContext } from "vscode";

import { settings } from "../settings";
import { getCommandName } from "../utils/commands";

export class WeatherStatusBar {

    public bar = window.createStatusBarItem(StatusBarAlignment.Right, -10);

    constructor() {
        this.update();
    }

    public update() {
        if (!settings.location) {
            this.show('No location', 'Update Settings', 'updateSettings');

        } else {
            this.show('🌡 20 ℃');
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

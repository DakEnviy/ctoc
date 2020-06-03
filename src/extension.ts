import { ExtensionContext, commands, window } from 'vscode';

import { settings } from './settings';
import { statusBar } from './components/WeatherStatusBar';
import { weatherService } from './service/weather';
import { getCommandName } from './utils/commands';

export function activate({ subscriptions }: ExtensionContext) {

    console.log('Congratulations, your extension "skyweather" is now active!');

    weatherService.start();

    settings.onUpdate(() => {
        weatherService.update();
    });

    weatherService.onUpdate(() => {
        statusBar.update();
    });

    subscriptions.push(statusBar.bar);

    subscriptions.push(commands.registerCommand(getCommandName('updateSettings'), () => {
        settings.updateSettings();
    }));

    subscriptions.push(commands.registerCommand(getCommandName('updateLocation'), () => {
        settings.updateLocation();
    }));
}

export function deactivate() {
    weatherService.stop();
}

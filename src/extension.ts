import { ExtensionContext, commands, window } from 'vscode';

import { settings } from './settings';
import { getCommandName } from './utils/commands';

export function activate(context: ExtensionContext) {

    console.log('Congratulations, your extension "skyweather" is now active!');

    context.subscriptions.push(commands.registerCommand(getCommandName('updateSettings'), () => {
        settings.updateSettings();
    }));

    let disposable = commands.registerCommand('skyweather.helloWorld', () => {
        window.showInformationMessage('Hello World from skyweather!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

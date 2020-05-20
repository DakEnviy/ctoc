import { workspace, ConfigurationTarget, window } from "vscode";

import { config } from "./config";

export class Settings {

    private extConfig = workspace.getConfiguration(config.extensionName);

    public location?: string = this.extConfig.get<string>('location');

    public async updateSettings() {
        const location = await window.showInputBox({
            value: this.location,
            ignoreFocusOut: true,
            prompt: 'City name'
        });
        this.setLocation(location);
    }

    public setLocation(location?: string) {
        this.location = location;
        this.extConfig.update('location', location, ConfigurationTarget.Global);
    }
}

export const settings = new Settings();

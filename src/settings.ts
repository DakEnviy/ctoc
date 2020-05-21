import { workspace, ConfigurationTarget, window } from "vscode";

import { config } from "./config";

export class Settings {

    private extConfig = workspace.getConfiguration(config.extensionName);
    private onUpdateCallback?: () => void;

    public location?: string = this.extConfig.get<string>('location');

    public async updateSettings() {
        await this.updateLocation(false);

        this.onUpdateCallback && this.onUpdateCallback();
    }

    public async updateLocation(needUpdate: boolean = true) {
        const location = await window.showInputBox({
            value: this.location,
            ignoreFocusOut: true,
            prompt: 'City name',
        });
        this.setLocation(location);

        needUpdate && this.onUpdateCallback && this.onUpdateCallback();
    }

    public setLocation(location?: string) {
        this.location = location;
        this.extConfig.update('location', location, ConfigurationTarget.Global);
    }

    public onUpdate(callback: Settings['onUpdateCallback']) {
        this.onUpdateCallback = callback;
    }
}

export const settings = new Settings();

import { config } from "../config";

export const getCommandName = (name: string): string => {
    return `${config.extensionName}.${name}`;
};

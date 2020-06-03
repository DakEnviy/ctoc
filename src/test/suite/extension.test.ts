import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';

import { getCommandName } from '../../utils/commands';
import { WeatherApiResponse, WeatherApi } from '../../api/weather';
import { Weather } from '../../service/weather';
import { settings } from '../../settings';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Sample test', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });

    test('Get command name util test', () => {
        const result = getCommandName('TestName');
        assert.equal(result, 'skyweather.TestName');
    });

    test('Weather service test', async () => {
        const weatherResponseMock: WeatherApiResponse = {
            main: {
                temp: 13,
            },
            sys: {
                country: 'RU'
            },
            name: 'Zlatoust',
        };
        const settingsMock = {
            location: 'Zlatoust,RU'
        };

        const makeRequestStub = sinon.stub(WeatherApi, 'makeRequest');
        makeRequestStub.withArgs(settingsMock.location).resolves(weatherResponseMock);
        const settingsStub = sinon.stub(settings, 'location').get(() => settingsMock.location);
        const onUpdateSpy = sinon.spy();

        const weatherService = new Weather();
        weatherService.onUpdate(onUpdateSpy);
        await weatherService.update();

        assert.strictEqual(weatherService.getErrorMessage(), null);
        assert.strictEqual(weatherService.getTemperature(), 13);
        assert.strictEqual(weatherService.getCity(), 'Zlatoust,RU');
        assert.ok(onUpdateSpy.calledOnce);

        makeRequestStub.restore();
        settingsStub.restore();
    });
});

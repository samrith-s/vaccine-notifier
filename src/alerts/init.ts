import { Alert } from '../interface';

import * as setup from './setup';
import { fetchAlert } from './fetch';
import { AlertHandler, Notify } from './utils';
import { PollAlert } from './poll';
import { clearAlerts, removeAlert, setAlert } from './storage';
import { SendData } from './messaging';

setup.localforageSetup();
setup.setupNotifications();

AlertHandler('init', async () => {
    await PollAlert();
});

AlertHandler<Pick<Alert, 'name' | 'category' | 'state' | 'district'>>('add', async (key, data) => {
    const newAlert = {
        ...data,
        id: Date.now(),
        slots: [],
        shouldNotify: false,
    };

    await setAlert(newAlert);
    await fetchAlert(newAlert);

    SendData(key, newAlert);

    Notify(
        `"${data.name}" alert for ${data.category}+ in ${data.district.district_name}, ${data.state.state_name} added successfully!`
    );
});

AlertHandler<number>('remove', async (key, data) => {
    await removeAlert(data);
    SendData(key, data);
});

AlertHandler('clear', async (key, data) => {
    await clearAlerts();
    SendData(key, data);
});

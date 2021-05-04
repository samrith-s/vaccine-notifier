import { Alert } from '../interface';

import { fetchAlert } from './fetch';
import { SendCounter, SendData } from './messaging';
import { getAlerts } from './storage';

export async function PollAlert() {
    let timeout = 0;

    async function Poller() {
        const alerts: Alert[] = await getAlerts();

        for (let alert of alerts) {
            await fetchAlert(alert);
        }

        const newAlerts = await getAlerts();
        SendData('alerts::poll', newAlerts);
        SendCounter(Date.now());

        clearTimeout(timeout);

        timeout = (setTimeout(async () => {
            await Poller();
        }, 20000) as unknown) as number;
    }

    return await Poller();
}

import { Alert } from '../interface';

import { fetchAlert } from './fetch';
import { SendCounter, SendData } from './messaging';
import { getAlerts } from './storage';

export async function PollAlert() {
    let timeout = 0;
    let interval = 0;
    let count = 0;

    async function Poller() {
        const alerts: Alert[] = await getAlerts();

        clearTimeout(timeout);
        clearInterval(interval);

        for (let alert of alerts) {
            await fetchAlert(alert);
        }

        interval = (setInterval(() => {
            count++;
            SendCounter(count);
        }, 1000) as unknown) as number;

        timeout = (setTimeout(async () => {
            count = 0;
            const newAlerts = await getAlerts();
            SendData('alerts::poll', newAlerts);
            Poller();
        }, 15000) as unknown) as number;

        SendData('alerts::init', alerts);
    }

    return await Poller();
}

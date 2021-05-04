import { Alert } from '../interface';

import { fetchAlert } from './fetch';
import { SendCounter, SendData } from './messaging';
import { getAlerts } from './storage';
import { Notify } from './utils';

export async function PollAlert() {
    let timeout = 0;
    let counter = 0;

    async function Poller() {
        const alerts: Alert[] = await getAlerts();

        for (let alert of alerts) {
            await fetchAlert(alert);
        }

        let count = 20;
        const newAlerts = await getAlerts();
        SendData('alerts::poll', newAlerts);

        clearTimeout(timeout);
        clearInterval(counter);

        counter = (setInterval(() => {
            SendCounter(count--);
        }, 1000) as unknown) as number;

        timeout = (setTimeout(async () => {
            await Poller();
        }, 20000) as unknown) as number;
    }

    return await Poller();
}

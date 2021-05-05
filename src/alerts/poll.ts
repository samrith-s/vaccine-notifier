import { Alert } from '../interface';

import { fetchAlert } from './fetch';
import { SendData } from './messaging';
import { getAlerts } from './storage';

declare const self: ServiceWorkerGlobalScope;

export async function PollAlert() {
    let timeout: number;

    async function Poller() {
        const alerts: Alert[] = await getAlerts();

        for (let alert of alerts) {
            await fetchAlert(alert);
        }

        const newAlerts = await getAlerts();
        SendData('alerts::poll', newAlerts);

        self.clearTimeout(timeout);

        timeout = self.setTimeout(async () => {
            Poller();
        }, 20000);
    }

    return Poller();
}

import storage from 'localforage';

import { Alert } from '../interface';

export async function getAlert(alertId: number) {
    return (await storage.getItem(`alert::${alertId}`)) as Alert;
}

export async function getAlerts() {
    const alerts: Alert[] = [];
    await storage.iterate((value) => {
        alerts.push(value as Alert);
    });
    return alerts;
}

export async function setAlert(alert: Alert) {
    return (await storage.setItem(`alert::${alert.id}`, alert)) as Alert;
}

export async function removeAlert(alertId: number) {
    return await storage.removeItem(`alert::${alertId}`);
}

export async function clearAlerts() {
    return await storage.iterate(async (value, key) => {
        await storage.removeItem(key);
    });
}

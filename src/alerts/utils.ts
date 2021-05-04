import { Alert, AlertMethods, AlertWorkerMethods, Center, CenterData } from '../interface';

declare const self: ServiceWorkerGlobalScope;

export function AlertHandler<TData = any>(
    key: AlertMethods,
    callback: (action: AlertWorkerMethods, data: TData) => void
) {
    self.addEventListener('message', async (event) => {
        if (Array.isArray(event.data)) {
            const [message, data] = event.data;

            const newKey = `alerts::${key}` as AlertWorkerMethods;

            if (message === newKey) {
                try {
                    callback?.(newKey, data as TData);
                } catch (e) {
                    console.error(e);
                }
            }
        }

        return true;
    });
}

export function Notify(body: string) {
    if (Notification.permission === 'granted') {
        self.registration.showNotification('Vaccine Notifier', {
            body,
        });
    }
}

export function filterSlots(alert: Alert, centerData: CenterData): Center[] {
    return centerData.centers.filter((center) =>
        center.sessions.some(
            (session) => session.min_age_limit <= alert.category && session.available_capacity
        )
    );
}

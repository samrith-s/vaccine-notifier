import { Alert, AlertMethods, AlertWorkerMethods, Center, CenterData, Session } from '../interface';

declare const self: ServiceWorkerGlobalScope;

export function AlertHandler<TData = any>(
    event: ExtendableMessageEvent,
    key: AlertMethods,
    callback: (action: AlertWorkerMethods, data: TData) => void
) {
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
}

export function Notify(body: string) {
    if (Notification.permission === 'granted') {
        self.registration.showNotification('Vaccine Notifier', {
            body,
        });
    }
}

export function filterSlots(alert: Alert, centerData: CenterData): Center[] | Session[] {
    const conditional = (session: Session) =>
        session.min_age_limit <= alert.category && session.available_capacity;

    if (centerData.sessions) {
        return centerData.sessions.filter(conditional);
    }

    return centerData.centers?.filter((center) => center.sessions.some(conditional));
}

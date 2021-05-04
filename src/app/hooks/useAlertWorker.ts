import { Alert } from '../../interface';

export function useAlertWorker() {
    const init = () => {
        navigator.serviceWorker.controller?.postMessage(['alerts::init']);
    };

    const add = (alert: Pick<Alert, 'name' | 'category' | 'state' | 'district'>) => {
        navigator.serviceWorker.controller?.postMessage(['alerts::add', alert]);
    };

    const remove = (alertId: number) => {
        navigator.serviceWorker.controller?.postMessage(['alerts::remove', alertId]);
    };

    const update = (alertId: number, data: Partial<Omit<Alert, 'id'>>) => {
        navigator.serviceWorker.controller?.postMessage(['alerts::update', { alertId, data }]);
    };

    const clear = () => {
        navigator.serviceWorker.controller?.postMessage(['alerts::clear']);
    };

    return {
        init,
        add,
        remove,
        update,
        clear,
    };
}

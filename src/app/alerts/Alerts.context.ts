import { createContext } from 'react';
import { Alert } from '../../interface';

const noop = (...args: any[]) => {};

export const AlertsContext = createContext<{
    alerts: Alert[];
    hasAlerts: boolean;
    add: (alert: Pick<Alert, 'name' | 'category' | 'state' | 'district'>) => void;
    update: (alertId: number, data: Partial<Alert>) => void;
    remove: (alertId: number) => void;
    clear: () => void;
}>({
    alerts: [],
    hasAlerts: false,
    add: noop,
    update: noop,
    remove: noop,
    clear: noop,
});

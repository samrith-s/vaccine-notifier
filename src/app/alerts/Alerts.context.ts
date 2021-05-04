import { createContext } from 'react';
import { Alert } from '../../interface';

export const AlertsContext = createContext<{
    alerts: Alert[];
    hasAlerts: boolean;
    slotsAvailable: boolean;
}>({
    alerts: [],
    hasAlerts: false,
    slotsAvailable: false,
});

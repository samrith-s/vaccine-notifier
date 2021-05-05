import { createContext } from 'react';
import { Alert } from '../../interface';

export const AlertsContext = createContext<{
    alerts: Alert[];
    hasAlerts: boolean;
    slotsAvailable: boolean;
    updatedAt?: Date;
}>({
    alerts: [],
    hasAlerts: false,
    slotsAvailable: false,
    updatedAt: new Date(),
});

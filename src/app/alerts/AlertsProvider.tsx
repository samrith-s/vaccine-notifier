import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Alert } from '../../interface';

import { AlertsContext } from './Alerts.context';

const KEY = 'vn_alerts';

interface AlertsProviderProps {
    children?: React.ReactNode;
}

export function AlertsProvider({ children }: AlertsProviderProps) {
    const [alerts, setAlerts] = useState<Alert[]>([
        ...JSON.parse(window.localStorage.getItem(KEY) ?? '[]'),
    ]);

    const hasAlerts = useMemo(() => !!alerts.length, [alerts]);

    const add = useCallback(
        (alert: Pick<Alert, 'name' | 'category' | 'state' | 'district'>) => {
            const newAlerts: Alert[] = [
                ...alerts,
                {
                    id: Date.now(),
                    ...alert,
                    slots: [],
                },
            ];

            setAlerts(newAlerts);

            window.localStorage.setItem(KEY, JSON.stringify(newAlerts));
        },
        [alerts, setAlerts]
    );

    const remove = useCallback(
        (alertId: number) => {
            const newAlerts = [...alerts].filter((alert) => alert.id !== alertId);
            setAlerts(newAlerts);
            window.localStorage.setItem(KEY, JSON.stringify(newAlerts));
        },
        [alerts, setAlerts]
    );

    const update = useCallback(
        (alertId: number, data: Partial<Alert>) => {
            const index = alerts.findIndex((alert) => alert.id === alertId);

            if (index > -1) {
                const newAlerts = [...alerts];
                newAlerts[index] = {
                    ...newAlerts[index],
                    ...data,
                };
                setAlerts(newAlerts);
                window.localStorage.setItem(KEY, JSON.stringify(newAlerts));
            }
        },
        [alerts, setAlerts]
    );

    const clear = useCallback(() => {
        setAlerts([]);
        window.localStorage.setItem(KEY, JSON.stringify([]));
    }, [setAlerts]);

    useEffect(() => {
        const listener = () => {
            setAlerts(JSON.parse(window.localStorage.getItem(KEY) ?? '[]'));
        };

        window.addEventListener('storage', listener);

        return () => {
            window.removeEventListener('storage', listener);
        };
    });

    const contextData = useMemo(
        () => ({
            alerts,
            hasAlerts,
            add,
            update,
            remove,
            clear,
        }),
        [alerts, hasAlerts, add, update, remove, clear]
    );

    return <AlertsContext.Provider value={contextData}>{children}</AlertsContext.Provider>;
}

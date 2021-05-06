import React, { useEffect, useMemo, useState } from 'react';
import { DataChannel } from '../../alerts/channels';

import { Alert, AlertWorkerMethods } from '../../interface';
import { useAlertWorker } from '../hooks/useAlertWorker';

import { AlertsContext } from './Alerts.context';

interface AlertsProviderProps {
    children?: React.ReactNode;
}

export function AlertsProvider({ children }: AlertsProviderProps) {
    const { init } = useAlertWorker();
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [updatedAt, setUpdatedAt] = useState<Date>();

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const listener = (event: any) => {
            const key = event.key as AlertWorkerMethods;
            const data = event.data;

            switch (key) {
                case 'alerts::poll': {
                    setAlerts(data as Alert[]);
                    break;
                }

                case 'alerts::add': {
                    setAlerts([...alerts, data as Alert]);
                    break;
                }

                case 'alerts::remove': {
                    const index = alerts.findIndex((alert) => alert.id === data);

                    if (index > -1) {
                        const newAlerts = [...alerts];
                        newAlerts.splice(index, 1);
                        setAlerts(newAlerts);
                    }

                    break;
                }

                case 'alerts::clear': {
                    setAlerts([]);
                    break;
                }

                default: {
                    break;
                }
            }

            setUpdatedAt(new Date());

            return true;
        };

        DataChannel.addEventListener('message', listener);

        return () => {
            DataChannel.removeEventListener('message', listener);
        };
    });

    const hasAlerts = useMemo(() => !!alerts.length, [alerts]);

    const slotsAvailable = useMemo(() => alerts.some((alert) => alert.slots.length), [alerts]);

    const contextData = useMemo(
        () => ({
            updatedAt,
            slotsAvailable,
            alerts,
            hasAlerts,
        }),
        [slotsAvailable, alerts, hasAlerts, updatedAt]
    );

    return <AlertsContext.Provider value={contextData}>{children}</AlertsContext.Provider>;
}

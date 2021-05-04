import React, { useEffect, useMemo, useState } from 'react';

import { CHANNEL } from '../../constants';
import { Alert, AlertWorkerMethods } from '../../interface';
import { useAlertWorker } from '../hooks/useAlertWorker';

import { AlertsContext } from './Alerts.context';

interface AlertsProviderProps {
    children?: React.ReactNode;
}

const bc = new BroadcastChannel(CHANNEL);

export function AlertsProvider({ children }: AlertsProviderProps) {
    const { init } = useAlertWorker();
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const listener = (event: any) => {
            const key = event.data.key as AlertWorkerMethods;
            const data = event.data.data;

            switch (key) {
                case 'alerts::init':
                case 'alerts::poll': {
                    setAlerts(data as Alert[]);
                    break;
                }

                case 'alerts::add': {
                    console.log(alerts, data);
                    setAlerts([...alerts, data as Alert]);
                    break;
                }

                case 'alerts::remove': {
                    const newAlerts = [...alerts];
                    newAlerts.splice(data, 1);
                    setAlerts(newAlerts);
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

            return true;
        };

        bc.addEventListener('message', listener);

        return () => {
            bc.removeEventListener('message', listener);
        };
    });

    const hasAlerts = useMemo(() => !!alerts.length, [alerts]);

    const slotsAvailable = useMemo(() => alerts.some((alert) => alert.slots.length), [alerts]);

    const contextData = useMemo(
        () => ({
            slotsAvailable,
            alerts,
            hasAlerts,
        }),
        [slotsAvailable, alerts, hasAlerts]
    );

    return <AlertsContext.Provider value={contextData}>{children}</AlertsContext.Provider>;
}

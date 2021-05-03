import { useCallback, useEffect, useMemo, useState } from 'react';

import { Alert } from '../../interface';

const KEY = 'vn_alerts';

export function useAlerts() {
    const [alerts, setAlerts] = useState<Alert[]>(
        JSON.parse(window.localStorage.getItem(KEY) ?? '[]')
    );

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
            const index = alerts.findIndex((alert) => alert.id === alertId);

            const newAlerts = alerts.slice();
            setAlerts(newAlerts.splice(index, 1));

            window.localStorage.setItem(KEY, JSON.stringify(alerts));
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

        window.addEventListener('storage', listener, true);

        return () => {
            window.removeEventListener('storage', listener, true);
        };
    }, [setAlerts]);

    return {
        alerts,
        hasAlerts,
        add,
        remove,
        clear,
    };
}

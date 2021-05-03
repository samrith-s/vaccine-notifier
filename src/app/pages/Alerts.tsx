import React from 'react';

import { AlertCard } from '../components/AlertCard';
import { useAlerts } from '../hooks/useAlerts';

export function Alerts() {
    const { alerts } = useAlerts();

    return (
        <div className='grid auto-rows-max gap-4'>
            <h1 className='text-xl font-bold text-green-500'>My Alerts ({alerts?.length})</h1>
            {alerts.map((alert, index) => (
                <AlertCard key={index} alert={alert} />
            ))}
        </div>
    );
}

import React from 'react';

import { Alert } from '../../interface';
import { AlertCard } from '../components/AlertCard';

interface AlertsProps {
    alerts: Alert[];
}

export default function Alerts({ alerts }: AlertsProps) {
    return (
        <div className='grid auto-rows-max gap-4'>
            <h1 className='text-xl font-bold text-green-500'>My Alerts</h1>
            {alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
            ))}
        </div>
    );
}

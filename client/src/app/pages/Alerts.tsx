import React from 'react';
import { FaSync, FaSyringe } from 'react-icons/fa';

import { AlertCard } from '../components/AlertCard';
import { AlertCountdown } from '../components/AlertCountdown';
import { Button } from '../components/Button';
import { useAlerts } from '../hooks/useAlerts';

export function Alerts() {
    const { alerts, slotsAvailable, hasAlerts } = useAlerts();

    return (
        <div className='grid auto-rows-max gap-4'>
            <div className='flex items-center'>
                <div className='mr-5 w-full'>
                    <h1 className='text-xl font-bold text-green-500'>
                        My Alerts ({alerts?.length})
                    </h1>
                    <AlertCountdown />
                </div>

                <Button
                    stylize='blue'
                    stretch={false}
                    className='mr-2'
                    onClick={() => window.location.reload()}
                >
                    <FaSync />
                </Button>
                <Button
                    anchor
                    href='https://selfregistration.cowin.gov.in'
                    stylize={!slotsAvailable ? 'red' : 'green'}
                    stretch={false}
                >
                    <FaSyringe className='mr-2' /> Open Cowin
                </Button>
            </div>
            {!hasAlerts && (
                <div className='text-center h-36 flex items-center justify-center'>
                    <p className='text-gray-500'>You have no alerts</p>
                </div>
            )}
            {hasAlerts && alerts.map((alert, index) => <AlertCard key={index} alert={alert} />)}
        </div>
    );
}

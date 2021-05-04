import React from 'react';
import { FaSyringe } from 'react-icons/fa';

import { AlertCard } from '../components/AlertCard';
import { AlertCountdown } from '../components/AlertCountdown';
import { useAlerts } from '../hooks/useAlerts';
import { classNames } from '../util';

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

                <a
                    href='https://selfregistration.cowin.gov.in/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={classNames(
                        'flex',
                        'items-center',
                        'rounded',
                        'transition-all',
                        'px-4',
                        'py-2',
                        'flex-shrink-0',
                        'text-white',
                        slotsAvailable && 'bg-green-500',
                        !slotsAvailable && 'bg-red-600'
                    )}
                >
                    <FaSyringe className='mr-2' /> Open Cowin
                </a>
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

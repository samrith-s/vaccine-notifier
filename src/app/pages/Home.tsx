import React from 'react';

import { Alerts } from './Alerts';
import { useAlerts } from '../hooks/useAlerts';
import { CreateForm } from '../components/CreateForm';

import emptyStreets from '../../assets/empty-streets.svg';

export default function Home() {
    const { hasAlerts } = useAlerts();

    return (
        <>
            <div className='col-span-12 sm:col-span-4'>
                <CreateForm />
            </div>
            <div className='col-span-12 sm:col-span-8 min-h-full pt-4'>
                {!hasAlerts && (
                    <div className='text-center h-full'>
                        <img
                            src={emptyStreets}
                            alt='empty-streets'
                            width='200'
                            className='inline'
                        />
                        <p className='text-gray-500'>You have no alerts</p>
                    </div>
                )}
                {hasAlerts && <Alerts />}
            </div>
        </>
    );
}

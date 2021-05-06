import React from 'react';

import { Alerts } from './Alerts';
import { CreateForm } from '../components/CreateForm';

export default function Home() {
    return (
        <>
            <div
                className='col-span-12 sm:col-span-4 lg:sticky top-0 left-auto'
                style={{ height: 'max-content' }}
            >
                <CreateForm />
            </div>
            <div className='col-span-12 sm:col-span-8 min-h-full'>
                <Alerts />
            </div>
        </>
    );
}

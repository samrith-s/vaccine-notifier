import React from 'react';
import d from 'dayjs';

import { useAlerts } from '../hooks/useAlerts';

export function AlertCountdown() {
    const { updatedAt } = useAlerts();

    return (
        <div className='text-gray-500 text-sm'>
            Last updated at {d(updatedAt).format('DD-MM-YYYY [at] h:mma')}
        </div>
    );
}

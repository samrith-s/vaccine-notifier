import React, { useEffect, useState } from 'react';
import d from 'dayjs';

import { CounterChannel } from '../../alerts/channels';

export function AlertCountdown() {
    const [updatedAt, setUpdatedAt] = useState(0);

    useEffect(() => {
        const listener = (date: any) => {
            setUpdatedAt(date);
            return true;
        };

        CounterChannel.addEventListener('message', listener);

        return () => {
            CounterChannel.removeEventListener('message', listener);
        };
    });

    return (
        <div className='text-gray-500'>
            {!!updatedAt && <>Last updated at {d(updatedAt).format('DD-MM-YYYY [at] h:mma')}</>}
        </div>
    );
}

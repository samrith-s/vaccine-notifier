import React, { useEffect, useState } from 'react';

import { CounterChannel } from '../../alerts/channels';

export function AlertCountdown() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const listener = (count: any) => {
            setCounter(count);
            return true;
        };

        CounterChannel.addEventListener('message', listener);

        return () => {
            CounterChannel.removeEventListener('message', listener);
        };
    });

    return (
        <div className='text-gray-500'>
            Refreshing {counter > 1 ? `in ${15 - counter} seconds` : 'now'}..
        </div>
    );
}

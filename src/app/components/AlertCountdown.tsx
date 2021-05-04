import React, { useEffect, useState } from 'react';

import { CounterChannel } from '../../alerts/channels';

export function AlertCountdown() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const listener = (event: any) => {
            const count = event.data ?? 0;
            setCounter(count);
            return true;
        };

        CounterChannel.addEventListener('message', listener, true);

        return () => {
            CounterChannel.removeEventListener('message', listener, true);
        };
    });

    return (
        <div className='text-gray-500'>
            Refreshing {counter > 1 ? `in ${15 - counter} seconds` : 'now'}..
        </div>
    );
}

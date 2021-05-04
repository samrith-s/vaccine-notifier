import React, { useEffect, useState } from 'react';

import { CHANNEL_COUNTER } from '../../constants';

const channel = new BroadcastChannel(CHANNEL_COUNTER);

export function AlertCountdown() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const listener = (event: any) => {
            const count = event.data ?? 0;
            setCounter(count);
            return true;
        };

        channel.addEventListener('message', listener);

        return () => {
            channel.removeEventListener('message', listener);
        };
    });

    return (
        <div className='text-gray-500 mb-5'>
            Refreshing {counter > 1 ? `in ${15 - counter} seconds` : 'now'}..
        </div>
    );
}

import { BroadcastChannel } from 'broadcast-channel';

import { CHANNEL, CHANNEL_COUNTER } from '../constants';

export const DataChannel = new BroadcastChannel(CHANNEL, {
    webWorkerSupport: true,
});

export const CounterChannel = new BroadcastChannel(CHANNEL_COUNTER, {
    webWorkerSupport: true,
});

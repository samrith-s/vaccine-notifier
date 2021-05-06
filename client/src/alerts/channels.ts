import { BroadcastChannel } from 'broadcast-channel';

import { CHANNEL } from '../constants';

export const DataChannel = new BroadcastChannel(CHANNEL, {
    webWorkerSupport: true,
});

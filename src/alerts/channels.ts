import { CHANNEL, CHANNEL_COUNTER } from '../constants';

export const DataChannel = new BroadcastChannel(CHANNEL);
export const CounterChannel = new BroadcastChannel(CHANNEL_COUNTER);

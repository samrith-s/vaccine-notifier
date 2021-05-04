import { CHANNEL, CHANNEL_COUNTER } from '../constants';
import { AlertWorkerMethods } from '../interface';

const DataChannel = new BroadcastChannel(CHANNEL);
const CounterChannel = new BroadcastChannel(CHANNEL_COUNTER);

export function SendData<T = any>(key: AlertWorkerMethods, data: T) {
    DataChannel.postMessage({ key, data });
}

export function SendCounter(count: number) {
    CounterChannel.postMessage(count);
}

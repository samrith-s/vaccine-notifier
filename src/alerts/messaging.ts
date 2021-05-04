import { AlertWorkerMethods } from '../interface';

import { CounterChannel, DataChannel } from './channels';

export function SendData<T = any>(key: AlertWorkerMethods, data: T) {
    DataChannel.postMessage({ key, data });
}

export function SendCounter(count: number) {
    CounterChannel.postMessage(count);
}

import { AlertWorkerMethods } from '../interface';

import { DataChannel } from './channels';

export function SendData<T = any>(key: AlertWorkerMethods, data: T) {
    DataChannel.postMessage({ key, data });
}

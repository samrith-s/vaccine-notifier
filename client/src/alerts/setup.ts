import storage from 'localforage';

declare const self: ServiceWorkerGlobalScope;

export function setupNotifications() {
    self.addEventListener('notificationclick', (event) => {
        event.waitUntil(
            self.clients.matchAll({ type: 'window' }).then((clients) => {
                if (clients.length) {
                    // check if at least one tab is already open
                    clients[0].focus();
                } else {
                    self.clients.openWindow('/');
                }
            })
        );
    });
}

export function localforageSetup() {
    storage.config({
        name: 'vn_data_store',
    });
}

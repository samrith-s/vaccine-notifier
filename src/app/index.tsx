import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AlertsProvider } from './alerts/AlertsProvider';
import Layout from './components/Layout';
import Home from './pages/Home';

if (!('Notification' in window) || Notification.permission === 'denied') {
    (window as any).__UNAVAILABLE = true;
} else if (Notification.permission !== 'granted') {
    // If it's okay let's create a notification
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            new Notification('Vaccine Notifier', {
                body:
                    'You have successfully enabled notifications! Please keep this window open to be notified whenever slots based on your alerts are available.',
            });
        }
    });
}

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <AlertsProvider>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                </AlertsProvider>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

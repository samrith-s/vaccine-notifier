import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AlertsProvider } from './alerts/AlertsProvider';
import Layout from './components/Layout';
import Home from './pages/Home';

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

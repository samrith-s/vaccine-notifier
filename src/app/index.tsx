import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner, ToastComponent, AlertComponent } from 'amis'

import Home from './views/home/index.js'

import './index.css';

const Viewer = React.lazy(() => import('./views/viewer/index.js'))
const Editor = React.lazy(() => import('./views/editor/index.js'))

ReactDOM.render(
    <BrowserRouter>
        <ToastComponent key="toast" />
        <AlertComponent key="alert" />
        <React.Suspense fallback={<Spinner overlay className="m-t-lg" size="lg" />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/viewer" element={<Viewer />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </React.Suspense>
    </BrowserRouter>,
    document.getElementById('root')
);


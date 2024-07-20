
'use client'
import React from 'react'

import { Provider } from "react-redux";
import store from '../components/redux/store'
import Loader from '../components/admin-panel/Loader';
import { useAppSelector } from '../components/redux/hook';

function App({ children }) {

    return (
        <Provider store={store}>
            {children}
        </Provider>)
}

export default App
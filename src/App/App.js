import React from 'react';
import {Provider} from 'react-redux';
import '../assets/scss/index.scss';
import Layout from '../Layout/Layout';
import {store} from '../store';

export default function App() {
   return (
        <>
            <Provider store={store}>
                <Layout/>
            </Provider>
        </>
   )
}




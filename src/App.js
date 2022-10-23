import React from 'react';
import Index from "./router/index"
import {BrowserRouter as Router} from "react-router-dom";

import 'bootstrap/dist/js/bootstrap.bundle';


import './assets/css/bootstrap.css';
import './assets/css/style.css';
import './assets/css/index.css';
import {persistor, store} from "./store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import GlobalFunctionsProvider from "./provider/GlobalFunctionsProvider";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <GlobalFunctionsProvider/>
                <Index/>
            </PersistGate>
        </Provider>
    );
}

export default App;

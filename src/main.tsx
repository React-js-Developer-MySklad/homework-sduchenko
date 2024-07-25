import 'flowbite';

import './style.css';
import {createRoot} from "react-dom/client";
import {App} from "./components/app";
import {CounterpartyProvider} from "./hooks/useCounterparty";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(
    <CounterpartyProvider>
        <App/>
    </CounterpartyProvider>
);
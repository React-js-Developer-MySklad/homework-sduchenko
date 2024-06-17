import 'flowbite';

import './style.css';
import {createRoot} from "react-dom/client";
import {App} from "./components/app";
import {CounterpartyRepositoryContext} from "./core/contexts"
import {CounterpartyRepository} from "./services/counterparty-repository";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(
    <CounterpartyRepositoryContext.Provider value={new CounterpartyRepository()}>
        <App/>
    </CounterpartyRepositoryContext.Provider>
);
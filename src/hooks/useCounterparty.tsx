import {createContext, useContext} from "react";
import {CounterpartyRepository, instance} from "../services/counterparty-repository";


const CounterpartyRepositoryContext = createContext<CounterpartyRepository | null>(null);

export const CounterpartyProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <CounterpartyRepositoryContext.Provider value={instance}>
            {children}
        </CounterpartyRepositoryContext.Provider>
    );
}

export const useCounterparty = () => {
    const ctx = useContext(CounterpartyRepositoryContext);
    if (!ctx) {
        throw new Error("Called outside <CounterpartyProvider>");
    }
    return ctx;
}
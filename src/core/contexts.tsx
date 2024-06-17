import {createContext} from "react";
import {CounterpartyRepository} from "../services/counterparty-repository"

export const CounterpartyRepositoryContext = createContext<CounterpartyRepository>(null);
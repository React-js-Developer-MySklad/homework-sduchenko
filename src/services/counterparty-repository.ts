import dataJson from "./data.json"
import {Counterparty} from "../model/counterparty";

class CounterpartyRepository {
    private data: Counterparty[]
    private readonly example: Counterparty

    constructor() {
        this.data = dataJson.filter(it => it.id > 0);
        this.example = dataJson.filter(it => it.id === 0)[0];
    }

    public load(): Promise<Counterparty[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.data]);
            }, 1000)
        });
    }

    public create(): Promise<Counterparty> {
        return new Promise((resolve) => {
            resolve({...this.example});
        });
    }

    public save(item: Counterparty): Promise<void> {
        return new Promise((resolve) => {
            this.doSave(item);
            resolve();
        });
    }

    private doSave(item: Counterparty) {
        // add new
        if (item.id === 0) {
            this.data.push({
                ...item,
                id: this.nextId()
            });
            return
        }

        // update existing
        this.data = this.data.map(it => {
            if (it.id === item.id) {
                return {...item};
            }
            return it;
        });
    }

    private nextId(): number {
        return this.data.map(it => it.id)
            .reduce((a, b) => Math.max(a, b), 0) + 1;
    }
}

export const counterpartyRepository = new CounterpartyRepository();
import {Counterparty} from "../model/counterparty";

const ENDPOINT_URL = "http://localhost:3000/counterparty";

export class CounterpartyRepository {
    private readonly example: Counterparty

    constructor() {
        console.log("repository created");

        this.example = {
            "name": "",
            "inn": "",
            "kpp": "",
            "address": ""
        };
    }

    public async load(): Promise<Counterparty[]> {
        const response = await fetch(ENDPOINT_URL);
        return await response.json();
    }

    public async create(): Promise<Counterparty> {
        return {...this.example};
    }

    public async save(item: Counterparty): Promise<void> {
        const method = !item.id ? "POST" : "PUT";
        const url = !item.id ? ENDPOINT_URL : `${ENDPOINT_URL}/${item.id}`

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        return null;
    }
}
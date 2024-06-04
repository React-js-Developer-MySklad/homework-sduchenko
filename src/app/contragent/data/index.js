import dataJson from "./data.json"


class ContragentRepository {

    #data;
    #example;

    constructor() {
        this.#data = dataJson.filter(it => it.id > 0);
        this.#example = dataJson.filter(it => it.id === 0)[0];
    }

    load() {
        return new Promise((resolve) => {
            resolve([...this.#data]);
        });
    }

    create() {
        return new Promise((resolve) => {
            resolve({...this.#example});
        });
    }

    save(item) {
        return new Promise((resolve) => {
            this.#doSave(item);
            resolve();
        });
    }

    #doSave(item) {
        // add new
        if (item.id === 0) {

            console.log("Next", this.#nexId())

            this.#data.push({
                ...item,
                id: this.#nexId()
            });
            return
        }

        // update existing
        this.#data = this.#data.map(it => {
            if (it.id === item.id) {
                return {...item};
            }
            return it;
        });
    }

    #nexId() {
        return this.#data.map(it => it.id).reduce((a, b) => Math.max(a, b), 0) + 1;
    }
}

export default ContragentRepository;
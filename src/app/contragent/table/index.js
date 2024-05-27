import './style.css'

import html from './table.html'
import rowHtml from './row.html'

import {elementFromHtml, elementFromTemplate} from '../../common'

class Table {
    #root;
    #handler;
    #data;

    constructor() {
        this.#root = elementFromHtml(html);
    }

    mount(parent) {
        console.log("mount");
        parent.appendChild(this.#root);
    }

    setData(data) {
        console.log("set data", data);
        this.#data = [...data];
        const root = this.#root;
        const body = root.getElementsByTagName("tbody")[0];

        while (body.childNodes.length > 0) {
            body.removeChild(body.childNodes[0]);
        }

        for (const item of data) {
            this.#addRow(item, body);
        }

        this.#bindHandlers();
    }

    #addRow(item, body) {
        const row = elementFromTemplate(rowHtml, item);
        console.log(row)
        body.appendChild(row);
    }

    #bindHandlers() {
        let rows = this.#root.getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr");

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowData = this.#data[i]
            const fun = (rowData) => {
                console.log("Clicked", rowData);
                this.#handler(rowData);
            };

            row.ondblclick = fun.bind(this, rowData)
        }
    }

    onDblClick(handler) {
        this.#handler = handler;
    }

}

export default Table;
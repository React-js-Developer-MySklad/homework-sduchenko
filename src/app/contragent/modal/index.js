import './style.css'

import html from './modal.html'

import {elementFromHtml} from '../../common'
import {Modal as FlowbiteModal} from 'flowbite'

class Modal {
    #root;
    #modal;
    #resolve;
    #data;
    #fields;

    constructor() {
        this.#root = elementFromHtml(html);
        this.#modal = new FlowbiteModal(this.#root)
        this.#fields = this.#initFields()
    }

    #initFields() {
        const root = this.#root;
        const fields = {};

        const elements = root.querySelectorAll("[id]");

        for (let element of elements) {
            fields[element.id] = element;
        }

        console.log("Fields", fields)

        return fields;
    }

    mount(parent) {
        console.log("mount");
        parent.appendChild(this.#root);
        this.#bindHandlers()
    }

    #bindHandlers() {
        const form = this.#root.querySelector("form");
        form.onsubmit = this.#onSubmit.bind(this);
    }

    edit(data) {
        this.#data = {...data};
        return new Promise((resolve) => {
            this.#resolve = resolve;
            this.#doEdit();
        });
    }

    #doEdit() {
        this.#setFieldsData({
            title: "Редактирование контрагента",
            ...this.#data
        });

        this.#modal.show()
    }

    #onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const data = this.#getFieldsData();
        this.#modal.hide();
        this.#resolve(data);
    }

    #setFieldsData(data) {
        const fields = this.#fields;

        for (let key in data) {
            if (key in fields) {
                const field = fields[key];
                if ("value" in field) {
                    field.value = data[key];
                } else {
                    field.innerText = data[key];
                }
            }
        }
    }

    #getFieldsData() {
        const fields = this.#fields;
        const data = {...this.#data};

        for (let key in data) {
            if (key in fields) {
                data[key] = fields[key].value;
            }
        }

        return data;
    }

}

export default Modal;
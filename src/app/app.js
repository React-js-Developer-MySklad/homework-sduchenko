import html from "./app.html"

import './app.css'

import Table from './contragent/table'
import Modal from './contragent/modal'
import ContragentRepository from "./contragent/data";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;
const main = document.getElementById("main");
const addButton = document.getElementById("add-button");

const contragentRepositort = new ContragentRepository();

let modal = new Modal();
let table = new Table();

function refresh() {
    contragentRepositort.load()
        .then(data => table.setData(data));
}

function addNew() {
    contragentRepositort.create()
        .then(item => modal.edit(item))
        .then(edited => {
            return contragentRepositort.save(edited)
        }).then(() => refresh());
}

table.onDblClick((item) => {
    modal.edit(item)
        .then(edited => {
            return contragentRepositort.save(edited)
        }).then(() => refresh());
});

addButton.onclick = (e) => {
    e.preventDefault();
    addNew();
};

table.mount(main);
modal.mount(main);

refresh();
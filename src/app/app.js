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
        .then(editContragent);
}

function editContragent(item) {
    modal.open(item)
        .then(edited => {
            return contragentRepositort.save(edited)
        }).then(() => refresh());
}

table.onEdit(editContragent);

addButton.onclick = (e) => {
    e.preventDefault();
    addNew();
};

main.appendChild(table.asDOMElement())
main.appendChild(modal.asDOMElement())

refresh();
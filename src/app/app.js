import html from "./app.html"
import dataJson from "./data.json"
import './app.css'

import Table from './contragent/table'

let data = [...dataJson];

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const main = document.getElementById("main");

let table = new Table();

table.mount(main);
table.onDblClick(() => {
    alert("Clicked!");
});
table.setData(data);

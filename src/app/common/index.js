function elementFromHtml(html) {
    const container = document.createElement("template");
    container.innerHTML = html;
    return container.content.children[0];
}

function elementFromTemplate(template, data) {
    const element = elementFromHtml(template);
    const targets = element.querySelectorAll("[data-key]");
    for (const target of targets) {
        const key = target.dataset.key;
        target.innerText = data[key] || '';
    }

    return element;
}

export {
    elementFromHtml,
    elementFromTemplate,
}
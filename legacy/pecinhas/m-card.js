let templateSC = document.createElement('template');
templateSC.innerHTML = `
    <div>
        <div class="simple-card">
            <slot></slot>
        </div>
        <style>
            .simple-card {
                margin: 20px auto;
                background: var(--background, #FFF0E0);
                width: 95%;
                border-radius: 10px;
            }
        </style>
        <script>
            console.log("rodou!!!");
        </script>
    </div>
`

class SimpleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(templateSC.content.firstElementChild.cloneNode(true));
        loadScripts(this.shadowRoot.firstElementChild);
    }
}

window.customElements.define('m-card', SimpleCard);

function loadScripts(elemento) {
    console.log("elementos", elemento.getElementsByTagName("script"));
    Array.from(elemento.getElementsByTagName("script")).forEach(oldScript => {
        console.log('oldScript', oldScript);
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes)
            .forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
        console.log("templatePage depois:", elemento);
    });
}
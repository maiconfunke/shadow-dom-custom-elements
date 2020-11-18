class YazuoTabs extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.href = 'yazuo-tabs.css';

        let style = document.createElement('style');
        style.textContent = `
        .tabs {
          overflow: hidden;
          border: 1px solid #ccc;
          background-color: #f1f1f1;
        }
        
        .tabs button {
          background-color: inherit;
          float: left;
          border: none;
          outline: none;
          cursor: pointer;
          padding: 14px 16px;
          transition: 0.3s;
          font-size: 17px;
        }
        
        .tabs button:hover {
          background-color: #ddd;
        }
        
        .tabs button.active {
          background-color: #ccc;
        }

        .tabcontent {
          display: none;
          padding: 6px 12px;
          border: 1px solid #ccc;
          border-top: none;
        }
        
        .tabcontent.show {
            display: block;
        }`;


        let data = this.querySelectorAll('tab');
        let contents = [];
        let tabs = document.createElement('div');
        tabs.setAttribute('class', 'tabs');

        data.forEach(tabData => {
            const title = tabData.getAttribute('title');
            let tab = document.createElement('button');
            tab.innerText = title;
            tab.addEventListener('click', (evt) => {
                let tabcontents = shadow.querySelectorAll('div.tabcontent');
                tabcontents.forEach(tabcontent => {
                    if (tabcontent.id === title) {
                        tabcontent.classList.add('show');
                    } else {
                        tabcontent.classList.remove('show');
                    }
                })
            })
            let content = document.createElement('div');
            content.id = title;
            content.setAttribute('class', 'tabcontent')
            content.innerHTML = `
                <p>${tabData.innerHTML}</p>
            `;

            tabs.appendChild(tab);
            contents.push(content);
        });


        shadow.appendChild(style);
        shadow.appendChild(tabs);
        contents.forEach((content, index) => {
            index === 0 ? content.classList.add('show') : null;
            shadow.appendChild(content);
        });
    }
}

customElements.define('yazuo-tabs', YazuoTabs);
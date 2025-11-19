class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const currentPath = window.location.pathname;
        
        let basePath = '';
        
        if (currentPath.includes('/instruction-DCUg-KPKrug/')) {
            const pathAfterBase = currentPath.split('/instruction-DCUg-KPKrug/')[1];
            if (pathAfterBase && pathAfterBase.includes('/')) {
                basePath = '../';
            } else {
                basePath = '';
            }
        } else {
            basePath = 'instruction-DCUg-KPKrug/';
        }

        this.innerHTML = `
            <header>
                <nav class="menu" id="menu">
                    <ul>
                        <li><a href="${basePath}service-maintenance.html" class="menu-element">Сервисное<br>обслуживание</a></li>
                        <li><a href="${basePath}replacing-configuring-modules.html" class="menu-element">Замена, настройка,<br>соединение модулей</a></li>
                        <li><a href="${basePath}possible-malfunctions.html" class="menu-element">Возможные<br>неисправности</a></li>
                    </ul>
                </nav>
                <button class="burger" id="burger" aria-label="Открыть меню" aria-expanded="false">
                    <span class="burger-line"></span>
                </button>
                <a class="image-btn" href="${basePath}main.html">
                    <img src="${basePath}img-css/logo-rezerv.png" class="logo-header">
                    <img src="${basePath}img-css/logo.png" class="logo-header logo-mobile"> 
                </a> 
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);

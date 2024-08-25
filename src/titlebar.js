const { ipcRenderer } = require('electron');

function updateData() {
    const rootStyle = getComputedStyle(document.body);
    const mainColor = rootStyle.getPropertyValue('--yurba-main-color').trim();
    const textColor = rootStyle.getPropertyValue('--yurba-text-color').trim();
    let title = document.title;

    let host = window.location.host

    console.warn(!host.includes("desktop.yurba.one"))

    if(!host.includes("desktop.yurba.one")) {
        ipcRenderer.send('send-webview-data', mainColor, textColor, [title, host]);
    }
    else {
        ipcRenderer.send('send-webview-data', mainColor, textColor, title);
    }
}

// Отправка начальных CSS-переменных после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    updateData();

    // document.addEventListener('scroll', () => {
    //     document.querySelectorAll("a[href]").forEach(e => {
    //         const href = e.href;

    //         if (!href.startsWith("javascript:") && !href.endsWith("#") &&
    //             !href.match(/\.(png|jpg)$/)) {
    //             e.addEventListener("click", () => {
    //                 e.preventDefault();
    //                 window.electron.openInBrowser(href);
    //             })
    //         }
    //     });
    // });


    // Настройка MutationObserver для отслеживания изменений атрибута data-theme
    const observer = new MutationObserver(() => {
        updateData();
    });

    // Наблюдаем за изменениями атрибутов у body
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
});

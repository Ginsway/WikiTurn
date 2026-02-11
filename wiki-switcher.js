// ==UserScript==
// @name         Wiki Switcher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Switch between Wikipedia and Qiuwen Baike
// @author       You
// @match        https://zh.wikipedia.org/wiki/*
// @match        https://www.qiuwenbaike.cn/wiki/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get current page title
    const currentUrl = window.location.href;
    const pageTitle = document.querySelector('h1')?.textContent || '';

    let targetUrl = '';

    if (currentUrl.includes('zh.wikipedia.org')) {
        // From Wikipedia to Qiuwen
        targetUrl = `https://www.qiuwenbaike.cn/wiki/${encodeURIComponent(pageTitle)}`;
    } else if (currentUrl.includes('qiuwenbaike.cn')) {
        // From Qiuwen to Wikipedia
        targetUrl = `https://zh.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
    }

    // Create and insert button
    if (targetUrl && pageTitle) {
        const button = document.createElement('button');
        button.className = 'citizen-button';
        button.style.border = '2px solid #B3D9FF';
        button.style.padding = '0.5em 0.75em';

        // Create SVG icon
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 1024 1024');
        svg.setAttribute('width', '1em');
        svg.setAttribute('height', '1em');
        svg.style.marginRight = '0.5em';
        svg.style.verticalAlign = 'middle';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m-48.761905 192.097523L411.526095 341.333333l170.666667 170.666667-170.666667 170.666667L463.238095 734.378667 685.616762 512 463.238095 289.621333z');
        path.setAttribute('fill', 'white');

        svg.appendChild(path);
        button.appendChild(svg);

        // Add text
        const textSpan = document.createElement('span');
        if (currentUrl.includes('zh.wikipedia.org')) {
            textSpan.textContent = '前往qiuwen.wiki';
        } else {
            textSpan.textContent = '前往zh.wikipedia.org';
        }
        button.appendChild(textSpan);

        button.addEventListener('click', () => {
            window.location.href = targetUrl;
        });

        // Try to insert into page-actions (for Qiuwen)
        const pageActionsElement = document.querySelector('.page-actions');
        if (pageActionsElement) {
            pageActionsElement.appendChild(button);
        } else {
            // For Wikipedia, insert before p-lang-btn
            const langBtnElement = document.querySelector('#p-lang-btn');
            if (langBtnElement) {
                langBtnElement.parentNode.insertBefore(button, langBtnElement);
            } else {
                // Fallback
                document.body.insertBefore(button, document.body.firstChild);
            }
        }
    }
})();
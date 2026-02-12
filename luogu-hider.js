// ==UserScript==
// @name         洛谷隐藏难度元素
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  隐藏所有含有 lfe-caption class 的元素
// @author       Ginsway
// @match        https://www.luogu.com.cn/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
  'use strict';

  // 也可以通过 DOM 操作直接隐藏现有元素
  function hideElements() {
    const elements = document.querySelectorAll('.difficulty');
    elements.forEach(element => {
      element.style.display = 'none';
    });
  }

  // 页面加载完成时执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideElements);
  } else {
    hideElements();
  }

  // 监视 DOM 变化，隐藏动态加载的 lfe-caption 元素
  const observer = new MutationObserver(hideElements);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();

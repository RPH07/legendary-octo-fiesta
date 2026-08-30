(function () {
    var saved = localStorage.getItem('theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark').matches;
    var theme = saved || (systemDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
})();
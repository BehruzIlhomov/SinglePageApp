const routes = {
    '/': '<h1>Home</h1><p>Welcome to the homepage!</p>',
    '/about': '<h1>About</h1><p>About us page content goes here.</p>',
    '/contact': '<h1>Contact</h1><p>Contact us through this page.</p>'
};

let lastRoute = '';

function logCurrentRoute(route) {
    console.log(`Current route: ${route}`);
    lastRoute = route;
}

function router() {
    const path = window.location.hash.slice(1) || '/';
    const appDiv = document.getElementById('app');

    logCurrentRoute(path);

    appDiv.innerHTML = routes[path] || '<h1>404 - Page Not Found</h1>';
}

document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        const url = e.target.getAttribute('href');
        window.location.hash = url;
        router();
    }
});

window.addEventListener('hashchange', router);

window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash) {
        window.location.hash = '#/';
    }
    router();
});

const routes = {
    '/': '<h1>Home</h1><p>Welcome to the homepage!</p>',
    '/about': '/newPages/about.html',
    '/contact': '/newPages/contact.html'
};

let lastRoute = '';

function logCurrentRoute(route) {
    console.log(`Current route: ${route}`);
    lastRoute = route;
}

async function loadPageContent(path) {
    const appDiv = document.getElementById('app');
    
    try {
        const routeContent = routes[path];
        appDiv.innerHTML = await (routeContent.endsWith('.html') 
            ? fetch(routeContent).then(response => {
                if (!response.ok) throw new Error('Page not found');
                return response.text();
            })
            : routeContent
        );
    } catch (error) {
        appDiv.innerHTML = '<h1>404 - Page Not Found</h1>';
        console.error('Error loading page content:', error);
    }
}

function router() {
    const path = window.location.hash.slice(1) || '/';
    logCurrentRoute(path);
    loadPageContent(path);
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

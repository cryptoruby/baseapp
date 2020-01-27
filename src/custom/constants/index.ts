export const CUSTOM_PG_TITLE_PREFIX = 'Wiprex';

export const pgRoutes = (isLoggedIn: boolean): string[][] => {
    const routes = [
        ['page.header.navbar.trade', '/trading/', 'trade'],
        ['page.header.navbar.wallets', '/wallets', 'wallets'],
        ['page.header.navbar.openOrders', '/orders', 'orders'],
        ['page.header.navbar.history', '/history', 'history'],
    ];
    const routesUnloggedIn = [
        ['page.header.navbar.signIn', '/signin', 'signin'],
        ['page.header.signUp', '/signup', 'signup'],
        ['page.header.navbar.trade', '/trading/', 'trade'],
    ];
    return isLoggedIn ? routes : routesUnloggedIn;
};

export const DEFAULT_CCY_PRECISION = 4;
export const STORAGE_DEFAULT_LIMIT = 50;
export const VALUATION_PRIMARY_CURRENCY = 'USD';
export const VALUATION_SECONDARY_CURRENCY = 'ETH';

export const customColors = {
    light: {
        chart: {
            primary: '#fff',
            up: '#24ce95',
            down: '#ff5f62',
        },
        navbar: {
            avatar: '#4C525E',
            language: '#737F92',
            logout: '##737F92',
            sun: '#959EAB',
            moon: '#fff',
        },
        orderBook: {
            asks: '#ffc1c1',
            bids: '#a9ffdc',
        },
    },
    basic: {
        chart: {
            primary: '#fff',
            up: '#24ce95',
            down: '#ff5f62',
        },
        navbar: {
            avatar: '#4C525E',
            language: '#737F92',
            logout: '##737F92',
            sun: '#959EAB',
            moon: '#fff',
        },
        orderBook: {
            asks: '#ffc1c1',
            bids: '#a9ffdc',
        },
    },
};

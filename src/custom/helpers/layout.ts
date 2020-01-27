export const getStaticHeight = () => {
    const header = document.getElementsByTagName('header')[0];
    const headerHeight = header ? header.clientHeight : 0;
    const headerContainer = document.getElementsByClassName('pg-trading-header-container')[0];
    const headerContainerHeight = headerContainer ? headerContainer.clientHeight : 0;

    return headerHeight + headerContainerHeight;
};

export const gridUnitsToPixels = (gridUnit: number, rowHeight: number, margin: number) => {
    let res = gridUnit * (rowHeight + margin);
    if (gridUnit > 1) {
        res -= margin;
    }

    return res;
};

export const pixelsToGridUnits = (pixels: number, rowHeight: number, margin: number) => {
    let tmp = pixels;

    if (pixels / (rowHeight + margin) > 1) {
        tmp += margin;
    }

    return tmp / (rowHeight + margin);
};

const getLayouts = () => {
    const rowHeight = 14;
    const margin = 6;

    const orderHeight = 21;
    const minOrderBookHeight = 21;
    const minRecentTradesHeight = 10;
    const minTradingChartHeight = 21;
    const minOpenOrdersHeight = 7;
    const minMarketDepthsHeight = 9;
    const minMarketsHeight = 10;
    const staticHeight = getStaticHeight() || 96;
    const toolbarHeight = 4;

    const minGridHeight = gridUnitsToPixels(minTradingChartHeight, rowHeight, margin) +
        gridUnitsToPixels(minMarketDepthsHeight, rowHeight, margin) +
        gridUnitsToPixels(minOpenOrdersHeight, rowHeight, margin) + margin * 3;
    const gridHeight = Math.max(minGridHeight, window.innerHeight - staticHeight - margin * 3);

    const currentTradingChartHeight = pixelsToGridUnits(gridHeight - margin * 2 - gridUnitsToPixels(orderHeight, rowHeight, margin), rowHeight, margin);
    const tradingChartHeight = gridHeight >= minGridHeight ?
        currentTradingChartHeight + margin * 1 : Math.floor(Math.max(currentTradingChartHeight, minTradingChartHeight));
    const openOrdersHeight = gridHeight >= minGridHeight ?
        pixelsToGridUnits(gridHeight - gridUnitsToPixels(tradingChartHeight, rowHeight, margin) - gridUnitsToPixels(minMarketDepthsHeight, rowHeight, margin), rowHeight, margin) + 1.8 :
        minOpenOrdersHeight;

    const orderBookHeight = gridHeight >= minGridHeight ?
        pixelsToGridUnits(gridHeight - margin, rowHeight, margin) + margin - 3.3 :
        minOrderBookHeight;

    const recentTradesHeight = gridHeight >= minGridHeight ?
        pixelsToGridUnits(gridHeight - margin, rowHeight, margin) + margin - 3.3 :
        minRecentTradesHeight;

    const marketsHeight = gridHeight >= minGridHeight ?
        pixelsToGridUnits(gridHeight - margin, rowHeight, margin) - orderHeight + margin - 2.4 :
        minMarketsHeight;

    return {
        lg: [
            { x: 8, y: tradingChartHeight + toolbarHeight, w: 8, h: tradingChartHeight, i: '1', minH: 16, maxH: orderHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 0, y: toolbarHeight, w: 16, h: tradingChartHeight, i: '2', minH: minTradingChartHeight, minW: 5, isDraggable: false, isResizable: false },
            { x: 0, y: tradingChartHeight + toolbarHeight, w: 8, h: tradingChartHeight, i: '3', minH: minOrderBookHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 0, y: (tradingChartHeight * 2) + toolbarHeight, w: 12, h: tradingChartHeight / 1.2, i: '4', minH: minOpenOrdersHeight, minW: 5, isDraggable: false, isResizable: false },
            { x: 12, y: (tradingChartHeight * 2) + toolbarHeight, w: 12, h: tradingChartHeight / 1.2,  i: '5', minH: minRecentTradesHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 16, y: toolbarHeight, w: 8, h: tradingChartHeight * 2, i: '6', minH: minMarketsHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 0, y: 0, w: 24, h: 4, i: '7', minH: 4, minW: 24, isDraggable: false, isResizable: false },
        ],
        md: [
            { x: 16, y: 22, w: 8, h: orderHeight, i: '1', minH: orderHeight, maxH: orderHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 0, y: 4, w: 16, h: tradingChartHeight, i: '2', minH: minTradingChartHeight, minW: 5, isDraggable: false, isResizable: false },
            { x: 16, y: 4, w: 8, h: orderBookHeight, i: '3', minH: minOrderBookHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 0, y: 64, w: 16, h: openOrdersHeight, i: '4', minH: minOpenOrdersHeight, minW: 5, isDraggable: false, isResizable: false },
            { x: 0, y: 64, w: 16, h: recentTradesHeight, i: '5', minH: minRecentTradesHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 20, y: 40, w: 8, h: marketsHeight, i: '6', minH: minMarketsHeight, minW: 4, isDraggable: false, isResizable: false },
            { x: 0, y: 0, w: 24, h: 4, i: '7', minH: 4, minW: 24, isDraggable: false, isResizable: false },
        ],
        sm: [
            { x: 0, y: 12, w: 12, h: 22, i: '1', minH: 22, maxH: 22, minW: 5, isDraggable: false },
            { x: 0, y: 28, w: 12, h: 30, i: '2', minH: 30, minW: 5, isDraggable: false },
            { x: 0, y: 58, w: 12, h: 18, i: '3', minH: 12, minW: 3, isDraggable: false },
            { x: 0, y: 82, w: 12, h: 20, i: '4', minH: 12, minW: 7, isDraggable: false },
            { x: 0, y: 106, w: 12, h: 20, i: '5', minH: 12, minW: 7, isDraggable: false },
            { x: 0, y: 126, w: 12, h: 20, i: '6', minH: 12, minW: 7, isDraggable: false },
            { x: 0, y: 0, w: 12, h: 10, i: '7', minH: 10, minW: 12, isDraggable: false, isResizable: false },
        ],
    };
};

export const customLayouts = getLayouts();

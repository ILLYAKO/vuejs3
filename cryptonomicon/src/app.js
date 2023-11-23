const API_KEY =
    "4831e2c2a4a31f4e1367161035dabbe1147ae8af2b4fc4e3eae9dc988038eef4";
const tickersHandlers = new Map();
const socket = new WebSocket(
    `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);
const AGGREGATE_INDEX = "5";

socket.addEventListener("message", (e) => {
    const {
        TYPE: type,
        FROMSYMBOL: currency,
        PRICE: newPrice,
    } = JSON.parse(e.data);
    if (type !== AGGREGATE_INDEX) {
        return;
    }

    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach((fn) => fn(newPrice));
});

// TODO: refactor to use URLSearchParams
/*const loadTickers = () => {
    if (tickersHandlers.size === 0) {
        return;
    }
    fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
            ...tickersHandlers.keys(),
        ].join(",")}&tsyms=USD&api_key=${API_KEY}`
    )
        .then((res) => res.json())
        .then((rawData) => {
            const updatedPrices = Object.fromEntries(
                Object.entries(rawData).map(([key, value]) => [key, value.USD])
            );

            Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
                const handlers = tickersHandlers.get(currency) ?? [];
                handlers.forEach((fn) => {
                    fn(newPrice);
                });
            });
        });
};
*/

function sendToWebSocket(message) {
    const stringifiedMessage = JSON.stringify(message);

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(stringifiedMessage);
        return;
    }
    socket.addEventListener(
        "open",
        () => {
            socket.send(stringifiedMessage);
        },
        { once: true }
    );
}

function subscribeToTickerOnWs(ticker) {
    sendToWebSocket({
        action: "SubAdd",
        subs: [`5~CCCAGG~${ticker}~USD`],
    });
}

function unsubscribeFromTickerOnWs(ticker) {
    sendToWebSocket({
        action: "SubRemove",
        subs: [`5~CCCAGG~${ticker}~USD`],
    });
}

export const subscribeToTicker = (ticker, cb) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, cb]);
    subscribeToTickerOnWs(ticker);
};

export const unsubscribeToTicker = (ticker) => {
    tickersHandlers.delete(ticker);
    unsubscribeFromTickerOnWs(ticker);
};

window.tickers = tickersHandlers;

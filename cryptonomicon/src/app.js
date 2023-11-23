const API_KEY =
    "4831e2c2a4a31f4e1367161035dabbe1147ae8af2b4fc4e3eae9dc988038eef4";
const tickersHandlers = new Map();

// TODO: refactor to use URLSearchParams
const loadTickers = () => {
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
                handlers.forEach((fn)=>{fn(newPrice)})
            });
        });
};

export const subscribeToTicker = (ticker, cb) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeToTicker = ticker => {
tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;

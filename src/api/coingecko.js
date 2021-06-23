export const getExchange = async(name) => {
    const url = `https://api.coingecko.com/api/v3/exchanges/${name}`;

    // eslint-disable-next-line no-undef
    const resp = await fetch(url);
    const data = await resp.json();

    const exchange = {
        name: data.name,
        image: data.image
    };
    return exchange;
};

export const getCurrentExchange = async(name, exchanges) => {
    const url = `https://api.coingecko.com/api/v3/coins/tether/tickers?exchange_ids=${name}`;

    const resp = await fetch(url);
    const { tickers } = await resp.json();

    const ticker = tickers.map((current) => {
        const value = {
            name: current.market.name,
            base: current.base,
            volume: current.volume,
            usd: current.converted_last.usd,
            last: current.last,
            spread: (current.last * (current.bid_ask_spread_percentage / 100 + 1))
        };
        return value;
    });

    return ticker;
};
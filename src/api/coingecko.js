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

export const getCurrentExchange = async(name) => {
    const url = `https://api.coingecko.com/api/v3/coins/tether/tickers?exchange_ids=${name}`;

    const resp = await fetch(url);
    const { tickers } = await resp.json();

    const ticker = tickers.map((current) => {
        const value = {
            url: current.trade_url,
            name: current.market.name,
            base: current.base,
            target: current.target,
            volume: current.volume,
            usd: current.converted_last.usd,
            last: current.last,
            spread: (current.last * (current.bid_ask_spread_percentage / 100 + 1))
        };
        return value;
    });


    return ticker;
};

export const getCurrentGlobal = async(id) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`

    const resp = await fetch(url);
    const current = await resp.json();

    const currentFormat = await {
        name: id,
        usd: Object.values(current)[0].usd
    }
    return currentFormat;
}
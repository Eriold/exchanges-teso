export const getExchange = async(name) => {
    const url = `https://api.coingecko.com/api/v3/exchanges/${name}`;

    // eslint-disable-next-line no-undef
    const resp = await fetch(url);
    const data = await resp.json();

    const exchange = {
        name: data.name,
        image: data.image
    };
    return await exchange;
};

export const getCurrentExchange = async(name, page, target) => {
    let newCurrentExhange = [];

    for (let i = 1; i <= page; i++) {
        let url;
        if (target === 'krown') {
            url = `https://api.coingecko.com/api/v3/exchanges/${name}/tickers?page=${page}`
        } else {
            url = `https://api.coingecko.com/api/v3/coins/tether/tickers?exchange_ids=${name}&page=${i}`;
        }

        const resp = await fetch(url);
        const { tickers } = await resp.json();

        // await setTimeout(() => {
        const ticker = tickers.map((current) => {
            const value = {
                id: current.market.name +
                    current.last +
                    current.base +
                    current.target +
                    i,
                url: current.trade_url,
                name: current.market.name,
                base: current.base,
                target: current.target,
                volume: current.volume,
                last: current.last,
                spread: current.last * (current.bid_ask_spread_percentage / 100 + 1),
                type: "Spot"
            };
            return value;
        });
        newCurrentExhange.push(ticker);
        // },i)
    }
    return newCurrentExhange.flat();
};

export const getCurrentExchangeFutures = async(name) => {
    const url = `https://api.coingecko.com/api/v3/derivatives/exchanges/${name}?include_tickers=tether`;

    const resp = await fetch(url);
    const { tickers } = await resp.json();

    const ticker = tickers.map((current) => {
        const value = {
            id: current.symbol + current.last + current.base + current.target,
            url: current.trade_url === "noopener noreferrer" ? "#" : current.trade_url,
            name: name,
            base: current.base,
            target: current.target,
            volume: parseInt(current.converted_volume.usd),
            last: current.last,
            spread: current.last * (current.bid_ask_spread / 100 + 1),
            type: "Futures"
        };
        return value;
    });

    return ticker;
};

export const getCurrentGlobal = async(id) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`;

    const resp = await fetch(url);
    const current = await resp.json();

    const currentFormat = await {
        name: id,
        usd: Object.values(current)[0].usd
    };
    return await currentFormat;
};
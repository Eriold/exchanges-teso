const getExchange = async(name) => {
    const url = `https://api.coingecko.com/api/v3/exchanges/${name}`

    // eslint-disable-next-line no-undef
    const resp = await fetch(url);
    const data = await resp.json();

    const exchange = {
        name: data.name,
        image: data.image,
    }
    return exchange;
}

export default getExchange
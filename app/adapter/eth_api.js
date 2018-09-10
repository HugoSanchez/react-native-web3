const priceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR'

export const getEthPrice = () => {
  return fetch(priceUrl).then(res => res.json())
}

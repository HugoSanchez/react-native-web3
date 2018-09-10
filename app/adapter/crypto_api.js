const ethPriceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR'
const btcPriceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR'

const bitcoinBalance = `https://blockchain.info/rawaddr/`


export const getEthPrice = () => {
  return fetch(ethPriceUrl).then(res => res.json())
}

export const getBtcPrice = () => {
  return fetch(btcPriceUrl).then(res => res.json())
}

export const getBitcoinAddressBalance = (address) => {
  return fetch(bitcoinBalance + address).then(res => res.json())
}

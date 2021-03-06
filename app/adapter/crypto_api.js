import baseUrl from './baseUrl'

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

export const getNewEthId = () => {
  return fetch(`${baseUrl}/getEthId`).then(res => res.json())
}

export const getCurrentGasPrices = () => {
  console.log('Hit GOS Prices!!')
  return fetch('https://ethgasstation.info/json/ethgasAPI.json').then(res => res.json())
}

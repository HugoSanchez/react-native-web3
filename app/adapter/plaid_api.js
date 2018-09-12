import baseUrl from './baseUrl'

const getPlaidAccessToken = (PUBLIC_TOKEN) => {
  console.log('Hit That!')
  console.log('Public TOKEN: ', PUBLIC_TOKEN)
  console.log(`${baseUrl}/get_access_token`)
  return fetch(`${baseUrl}/get_access_token`,{
    headers: {
      'Content-Type': 'application/json',
       Authorization: PUBLIC_TOKEN,
    },
    method: 'POST',
    body: JSON.stringify({ public_token: PUBLIC_TOKEN })
  }).then(res => res.json())
}

const getUserAccounts = (ACCESS_TOKEN) => {
  console.log('ACCESS_TOKEN 2: ', ACCESS_TOKEN)
  return fetch(`${baseUrl}/accounts`,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    }
  }).then(res => res.json());
}

const getUserTransactions = (ACCESS_TOKEN) => {
  console.log('Hit THAT!!')
  return fetch(`${baseUrl}/transactions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    method: 'POST',
    body: JSON.stringify({ access_token: ACCESS_TOKEN })
  }).then(res => res.json())
}


export {
  getPlaidAccessToken,
  getUserTransactions,
  getUserAccounts
}

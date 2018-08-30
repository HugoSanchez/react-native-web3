const baseUrl = `http://10.218.1.167:3000`

// const getUserTransactions = (ACCESS_TOKEN) => {
//   console.log(ACCESS_TOKEN)
//   return fetch(`${baseUrl}/set_user_access_token`, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ access_token: ACCESS_TOKEN })
//   }).then(res => res.json())
//     .then(res => console.log(res))
// }
//
const getUserAccounts = (ACCESS_TOKEN) => {
  debugger
  console.log(ACCESS_TOKEN)
  return fetch(`${baseUrl}/accounts`,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: ACCESS_TOKEN,
    }
  }).then(res => res.json())
    .then(res => console.log(res))
}

const getPlaidAccessToken = (PUBLIC_TOKEN) => {
  // debugger
  return fetch(`${baseUrl}/get_access_token`,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: PUBLIC_TOKEN,
    },
    method: 'POST',
    body: JSON.stringify({ public_token: PUBLIC_TOKEN })
  }).then(res => {
    // debugger
    return res.json()
  })
    .then(res => console.log(res))
}

export {
  getPlaidAccessToken,
  getUserAccounts
}

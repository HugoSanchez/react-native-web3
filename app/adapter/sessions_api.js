import baseUrl from './baseUrl'

const signUserUp = (user) => {
  return fetch(`${baseUrl}/signup`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ user })
  }).then(res => res.json())
}

const signUserIn = (user) => {
  return fetch(`${baseUrl}/signin`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ user })
  }).then(res => res.json())
}

export {
  signUserIn,
  signUserUp
}

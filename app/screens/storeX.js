setMainState = () => {
  isSignedIn()
    .then(this.updateSignInAndCheckPlaidToken)
      .then(res => {
      if (res) {
        this.retrievePlaidToken()
          .then(res => {
          getUserAccounts(res)
          .then(this.setStateBalanceAndAccounts)
        return res }).then(res => getUserTransactions(res).then(res => console.log(res)))
      }}
    ).catch(err => alert('An error ocurred'))
}

// Helper Methods
updateSignInAndCheckPlaidToken = (res) => {
  this.setState({ signedIn: res, checkedSignIn: true })
  return hasBankAccountLinked()
}

retrievePlaidToken = () => {
  return AsyncStorage.getItem('plaid_token')
}

setStateBalanceAndAccounts = (res) => {
  this.setState({
    ...this.state,
    isSignedInToPlaid: true,
    total_balance: res.total_balance,
    accounts: res.accounts
  })
}

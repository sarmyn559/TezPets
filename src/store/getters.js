export default {
  isAuth (state) {
    return !!state.userAddress
  },
  shortWallet (state) {
    const address = state.userAddress
    return address ? `${address.substr(0, 4)}...${address.substr(-4)}` : ''
  }
}

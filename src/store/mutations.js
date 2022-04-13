
export default {
  frontendStorage (state, storage) {
    state.admin = storage.admin
    state.price = storage.price.toNumber()
    state.specialPrice = storage.special_price.toNumber()
    state.foodPrice = storage.food_price.toNumber()
    state.levelDuration = storage.level_duration.toNumber()
    state.leeway = storage.leeway.toNumber()
    state.petsMinted = storage.last_mint_id.toNumber()
    state.fa2 = storage.fa2
    state.loading = false
    // state.pool = storage.pool.dividedBy(1000000).toNumber()
    state.poolAddress = storage.fund
    state.paused = storage.paused
  },
  pool (state, balance) {
    state.pool = balance / 1000000
  },
  soldTokens (state, sold) {
    state.mintedTokens = sold
  },
  userAddress (state, address) {
    state.userAddress = address || ''
  },
  burning (state, status) {
    state.burning = status
  },
  ashCoins (state, amount) {
    state.ashCoins = amount
  }
}

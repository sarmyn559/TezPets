import config from '@/config'
import { TezosToolkit, MichelCodecPacker, OpKind } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import api from '../app/api'

const tezos = new TezosToolkit(config.endpoint)
tezos.setPackerProvider(new MichelCodecPacker())
const wallet = new BeaconWallet(config.walletOptions)
tezos.setWalletProvider(wallet)

const LAST_LEVEL = 6

const subscribeOperation = tezos.stream.subscribeOperation({
  and: [
    { destination: config.crowdsale }, // must be our action contract
    { kind: OpKind.TRANSACTION }
  ]
})

const pool = {}

async function getContract (kt) {
  if (!pool[kt]) {
    pool[kt] = tezos.wallet.at(kt)
  }
  return await pool[kt]
}

export default {

  async init ({ commit }) {
    if (await wallet.client.getActiveAccount()) {
      const address = await wallet.getPKH()
      commit('userAddress', address)
    }
    const contract = await getContract(config.crowdsale)
    const poll = async () => {
      const storage = await contract.storage()
      commit('frontendStorage', storage)
      const pool = await tezos.tz.getBalance(storage.fund)
      commit('pool', pool)
      // console.log(storage)
      setTimeout(poll, config.pollInterval)
    }
    poll()
    subscribeOperation.on('data', data => {
      console.log('mint:', data.parameters?.entrypoint === 'mint')
    })
  },

  onTransactionStream (_, cb) {
    subscribeOperation.on('data', cb)
  },

  offTransactionStream (_, cb) {
    subscribeOperation.off('data', cb)
  },

  async connectWallet ({ state, commit, dispatch }) {
    let activeAccount = await wallet.client.getActiveAccount()
    console.log(activeAccount)
    try {
      if (!activeAccount) {
        await dispatch('disconnectWallet')
        await wallet.requestPermissions({
          network: {
            type: config.network
          }
        })
        activeAccount = await wallet.client.getActiveAccount()
        if (!activeAccount) {
          throw new Error('Wallet not connected')
        }
      }
      const address = await wallet.getPKH()
      commit('userAddress', address)
    } catch (e) {
      console.log(e)
      await dispatch('disconnectWallet')
    }
    return !!state.userAddress
  },

  async disconnectWallet ({ commit }) {
    await wallet.clearActiveAccount()
    commit('userAddress', null)
  },

  async buyToken ({ dispatch }, { amount, petType, id }) {
    try {
      await dispatch('connectWallet')
      const contract = await getContract(config.crowdsale)
      const op = id ? await contract.methods.mint_special(petType, id).send({ amount, mutez: true }) : await contract.methods.mint(petType).send({ amount, mutez: true })
      const result = await op.confirmation()
      if (result.completed) {
        return true
      }
      throw new Error('Mint transaction failed')
    } catch (e) {
      if (e.title === 'Aborted') return false
      else throw e
    }
  },

  async feed ({ state, dispatch }, id) {
    try {
      await dispatch('connectWallet')
      const contract = await getContract(config.crowdsale)
      const op = await contract.methods.feed(id).send({ amount: state.foodPrice, mutez: true })
      const result = await op.confirmation()
      if (result.completed) {
        return true
      }
      throw new Error('Transaction failed')
    } catch (e) {
      if (e.title === 'Aborted') return false
      else throw e
    }
  },

  async batchFeed ({ state, dispatch }, ids) {
    try {
      await dispatch('connectWallet')
      const contract = await getContract(config.crowdsale)
      const batch = await tezos.wallet.batch(
        ids.map(id => ({
          kind: OpKind.TRANSACTION,
          ...contract.methods.feed(id).toTransferParams(),
          amount: state.foodPrice,
          mutez: true
        })
      ))
      const batchOp = await batch.send()
      const result = await batchOp.confirmation()
      if (result.completed) {
        return true
      }
      throw new Error('Transaction failed')
    } catch (e) {
      if (e.title === 'Aborted') return false
      else throw e
    }
  },

  async breed ({ state, dispatch }, { id1, id2 }) {
    try {
      await dispatch('connectWallet')
      const contract = await getContract(config.crowdsale)
      const op = await contract.methods.breed(id1, id2).send({ amount: state.foodPrice, mutez: true })
      const result = await op.confirmation()
      if (result.completed) {
        return true
      }
      throw new Error('Transaction failed')
    } catch (e) {
      if (e.title === 'Aborted') return false
      else throw e
    }
  },

  async burn ({ state, dispatch, commit }, { id, level } ) {
    try {
      await dispatch('connectWallet')
      const contract = await getContract(state.fa2)
      const frontend = await getContract(config.crowdsale)
      commit('burning', Number(level) === LAST_LEVEL ? 'good' : 'bad')
      const batch = await tezos.wallet.batch([
        {
          kind: OpKind.TRANSACTION,
          ...contract.methods.update_operators([{
            add_operator: {
              owner: state.userAddress,
              operator: config.crowdsale,
              token_id: id
            }
          }]).toTransferParams()
        },
        {
          kind: OpKind.TRANSACTION,
          ...frontend.methods.burn(id).toTransferParams()
        }
      ])
      const batchOp = await batch.send()
      const result = await batchOp.confirmation()
      if (result.completed) {
        return true
      }
      throw new Error('Transaction failed')
    } catch (e) {
      if (e.title === 'Aborted') return false
      else throw e
    } finally {
      commit('burning', false)
    }
  },

  async listPets ({ state }, { address }) {
      if (!address) throw new Error('Address is missing')
      let params = { 'select.values': 'key', active: true, value: address, limit: 500 }
      const ids = await api.getBigMapData(state.fa2, 'ledger', params, 1000)
      if (!ids.length) {
        return []
      }
      params = {'select.values': 'key,value', active: true, 'sort.desc': 'id'}
      if (ids.length > 1) {
        params['key.in'] = ids.join(',')
      } else {
        params['key.eq'] = ids[0]
      }
      const pets = await api.getBigMapData(config.crowdsale, 'creatures', params, 300)
      return pets.map(([id, pet]) => {
        const feedDate = new Date(pet.next_feed)
        const deadline = new Date(pet.next_feed)
        if (pet.level < 6) {
          deadline.setSeconds(deadline.getSeconds() + pet.level > 0 ? state.leeway : state.eggLeeway)
        }
        return {
          id,
          loading: false,
          picture: `${pet.kind}${pet.level}`,
          kind: Number(pet.kind),
          breedable: pet.breedable && pet.level > 3 && pet.level < 6,
          nextFeed: feedDate,
          level: Number(pet.level),
          fed: Number(pet.feed_n),
          deadline
        }
      })
  }
}

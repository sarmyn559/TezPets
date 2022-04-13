import { NetworkType } from '@airgap/beacon-sdk'
const PROJECT_NAME = 'Tez pets'
const NETWORK = NetworkType.MAINNET
/*
Deploing Pets FA2 testnet
Pets: KT1E3ktPtyXbSZuFNp23ZYKfihLTAsXVPN5S
Deploing frontend
Frontend: KT1X7Pu84oguAX7xHm6JT71Vp4N5uGBXwFRG
Registering frontend contract at fa2 contract
*/
// 'https://sebuh.net:8732'
export default {
  endpoint: NETWORK === NetworkType.MAINNET ? 'https://sebuh.net:8732' : 'https://hangzhounet.api.tez.ie',
  explorer: 'https://tzkt.io',
  tzktapi: NETWORK === NetworkType.MAINNET ? 'https://api.tzkt.io' : 'https://api.hangzhou2net.tzkt.io',
  network: NETWORK, // MAINNET
  crowdsale: 'KT1MoSFPJGxxoyqnXFrPcZ5xFvkwyCY3gPpm',
  pageSize: 20,
  pollInterval: 15000,
  projectName: PROJECT_NAME,
  walletOptions: {
    name: PROJECT_NAME,
    disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
  }
}
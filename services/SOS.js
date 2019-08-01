import { fetch, removeCookieByName } from 'react-native-ssl-pinning'
import store from '../redux/store'

export const getSOSResources = () => {
  const countryCode = store.getState().user.countryCode
  console.log(`https://rbeats.alucinastudio.com/getItems/sos/${countryCode}`)
  return fetch(`https://rbeats.alucinastudio.com/getItems/sos/${countryCode}`, {
    method: 'GET',
    sslPinning: {
      certs: ["rbeats_cert"]
    },
  })
    .then(res => res.json())
    .then(res => res.item)
}
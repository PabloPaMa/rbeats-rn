import { fetch, removeCookieByName } from 'react-native-ssl-pinning'
import store from '../redux/store'

export const getMediaResources = () => {
  const countryCode = store.getState().user.countryCode
  return fetch(`https://rbeats.alucinastudio.com/getItems/media/${countryCode}`, {
    method: 'GET',
    sslPinning: {
      certs: ["rbeats_cert"]
    },
  })
    .then(res => res.json())
    .then(res => res.item)
}
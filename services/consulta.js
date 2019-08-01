import { fetch, removeCookieByName } from 'react-native-ssl-pinning'
import store from '../redux/store'

export const getConsultaResources = () => {
  const countryCode = store.getState().user.countryCode
  return fetch(`https://rbeats.alucinastudio.com/getItems/consulta/${countryCode}`, {
    method: 'GET',
    sslPinning: {
      certs: ["rbeats_cert"]
    },
  })
    .then(res => res.json())
    .then(res => res.item)
}
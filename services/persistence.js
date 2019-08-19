import { AsyncStorage } from 'react-native'
import CryptoJS from 'crypto-js'

const cryptoKey = 'ZrG6XZZiZfesbh79f1AX'

export const getItem = async (key) => {
  const data = await AsyncStorage.getItem(key)
  if (data === null) return null

  let bytes = CryptoJS.AES.decrypt(data, cryptoKey)
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return typeof decryptedData === 'string' ? decryptedData : JSON.stringify(decryptedData)
}

export const setItem = async (key, data) => {
  let cipherData = CryptoJS.AES.encrypt(data, cryptoKey).toString()
  return AsyncStorage.setItem(key, cipherData)
}


export const removeItem = async (key) => {
  return AsyncStorage.removeItem(key)
}

const Storage = {
  getItem,
  setItem,
  removeItem,
}

export default Storage
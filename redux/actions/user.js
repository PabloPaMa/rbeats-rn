export const setUserCountryCode = (countryCode = 'MX') => ({
  type: 'SET_COUNTRY_CODE',
  countryCode
})

export const setUser = (user = {}) => ({
  type: 'SET_USER',
  user
})

export const resetUserState = () => ({ type: 'RESET' })
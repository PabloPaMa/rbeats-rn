
const initialState = {
  userId: '007',
  username: 'User',
  countryCode: 'MX',
  countryName: 'México',
  email: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COUNTRY_CODE':
      return { ...state, countryCode: action.countryCode }
    case 'SET_USER':
      return { ...state, ...action.user }
    case 'RESET':
      return initialState
    default: return state
  }
}

const initialState = {
  lang: 'es',
  theme: 'light',
  showIntro: true,
  isOnline: true,
  langSelected: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme }
    case 'SET_LANG':
      return { ...state, lang: action.lang }
    case 'SET_SHOWINTRO':
      return { ...state, showIntro: action.showIntro }
    case 'SET_ONLINE_STATUS':
      return { ...state, isOnline: action.isOnline }
    case 'RESET':
      return initialState
    default: return state
  }
}
export const setTheme = (theme = 'light') => ({
  type: 'SET_THEME',
  theme
})

export const setLang = (lang = 'en') => ({
  type: 'SET_LANG',
  lang
})

export const setShowIntro = (showIntro = true) => ({
  type: 'SET_SHOWINTRO',
  showIntro
})

export const setOnlineStatus = (isOnline = true) => ({
  type: 'SET_ONLINE_STATUS',
  isOnline
})

export const resetAppState = () => ({ type: 'RESET' })
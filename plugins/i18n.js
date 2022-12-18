
export default function ({ app, $auth, $vuetify, store}) {
    
  
  app.i18n.onLanguageSwitched = (ـ, newLocale) => {
    // moment.locale(newLocale)
    app.i18n.setLocaleCookie(newLocale)
    if (newLocale === 'ar') {
        store.commit('setDir', 'rtl')
    } else {
        store.commit('setDir', 'ltr')
    }
  }
}

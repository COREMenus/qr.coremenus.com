import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import currencies from '@/assets/json/currencies.json'
import { textColor } from '~/misc/helpers'
import database from '@/database'
VuexORM.use(VuexORMAxios) 
export const plugins = [
    VuexORM.install(database)
]

export const state = () => ({
    shop: {},
    settings: {},
    branch: {},
    enableOrdering: false,
    locale: '',
    dir: 'ltr'
})

export const mutations = {
    setShop(state, shop) {
        state.shop = shop
    },
    setSettings(state, settings) {
        state.settings = settings
        state.locale = settings.default_language
    },
    setBranch(state, branch) {
        state.branch = branch
    },
    setLocale(state, locale){
        state.locale = locale
    },
    setDir(state, dir) {
        state.dir = dir
    },
    setOrdering(state, enableOrdering) {
        state.enableOrdering = enableOrdering
    }
}

export const getters = {
    currencySymbol(state) {
        const currency = currencies[state.settings.currency]
        return currency.symbol_native
    },
    bgText(state) {
       return textColor(state.settings.background_color || '')
        
    },
    accentText(state) {
        return textColor(state.settings.accent_color || '')
    },
    borderColor(state) {
        const _opacity = Math.round(Math.min(Math.max(0.1 || 1, 0), 1) * 255)
      return textColor(state.settings.background_color || '') + _opacity.toString(16).toUpperCase()
    }
}

export const actions = {
    async fetchShop({ commit }, ShopId) {
        const res = await this.$axios.get(`/shops/${ShopId}`)
        commit('setShop', res.data)
    },
    async fetchSettings({ commit, state }) {
        const res = await this.$axios.get(`/settings/${state.shop.id}`)
        commit('setSettings', res.data)
    },
    async fetchBranch({commit}, branchId) {
        const res = await this.$axios.get(`/branches/${branchId}`)
        commit('setBranch', res.data)
    }
}

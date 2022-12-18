export const state = () => ({
    menus: {},
})

export const mutations = {
    setMenus(state, menus) {
        // * Menu
        menus = menus.map(menu => {
            menu.translations = menu.menu_translations.reduce((data, item) => {
                data[item.locale] = item
                return data
            }, {})
            return menu
        })
        state.menus.byId = menus.reduce((data, item) => {
            data[item.id] = item
            return data
        }, {})
        state.menus.allIds = menus.map(menu => menu.id)
    }
}

export const actions = {
    async fetchAllMenus({commit, rootState}) {
        const shopId = rootState.shop.id
        const branchId = rootState.branch.id || ''
        const res = await this.$axios.get(`/menus/${shopId}/menus?branch=${branchId}`)
        commit('setMenus', res.data)
    }
}
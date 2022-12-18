export const state = () => ({
    items: [],
    type: '',
    table_number: '',
    car_number: '',
    status: '',
    BranchId: '',
    ShopId: '',
    note: '',

})

export const mutations = {
    addItem(state, item) {
        // * Check If Item with Same Option and Product Exists
        const foundItem = state.items.find(i => 
            i.ProductId === item.ProductId && i.ProductOptionId === item.ProductOptionId)
        if (foundItem) {
            foundItem.quantity += item.quantity
        } else {
            state.items.push(item)
        }
    },
    removeItem(state, item) {
        state.items = state.items.filter(i => i !== item)
    },
    decrementItem(state, item) {
        state.items = state.items.map(i => {
            if (i === item && item.quantity > 1) {
                i.quantity = i.quantity - 1
            }
            return i
        })
    },
    incrementItem(state, item) {
        state.items = state.items.map(i => {
            if (i === item) {
                i.quantity = i.quantity + 1
            }
            return i
        })
    },
    setType(state, type) {
        state.type = type
    },
    setBranchId(state, id) {
        state.BranchId = id
    },
    setCarNumber(state, number) {
        state.car_number = number
    },
    setTableNumber(state, number) {
        state.table_number = number
    },
    setStatus(state, status) {
        state.status = status
    },
    setOrderId(state, id) {
        state.orderId = id
    }
}


export const actions = {
    order({ state, commit }) {
        const order = {
            products: state.items,
            type: state.type,
            car_number: state.car_number,
            table_number: state.table_number,
            BranchId: state.BranchId
        }
        this.$socket.emit('orders:new', order)
    }
}
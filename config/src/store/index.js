import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import axios from '@/http/index'
Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [
        persistedState({ storage: window.sessionStorage })
    ],
    state: {
        token: '',
        navData: [],
        userInfo: {},
        cartData: [],
        scrolltimes: -1,
        orderData: []
    },
    getters: {
        cartTotalNum (state) {
            let curtotal = 0
            state.cartData.forEach((item) => {
                if (item.productionnum) {
                    curtotal += item.productionnum
                }
            })
            return curtotal
        }
    },
    mutations: {
        buy (state, orderinfo) {
            state.orderData = orderinfo
        },
        scrollBottonInit (state, value) {
            state.scrolltimes = value
        },
        setNav (state, value) {
            state.navData = value
        },
        setToken (state, value) {
            state.token = value
        },
        initLogin (state, loginInfo) {
            state.userInfo = loginInfo.userInfo
            state.cartData = loginInfo.cartData
        },
        logout (state) {
            state.userInfo = {}
        },
        scrollLoad (state) {
            if (state.scrolltimes !== -1) {
                state.scrolltimes++
            }
        },
        addCartData (state, type, value) {
            if (type === 'add') {
                state.cartData.push(value)
            } else {
                // 改数量 返回已经封装好数量的数据 替换原来的数据
                state.cartData.forEach((item, key) => {
                    if (item.id === value.id) {
                        state.cartData[key] = value
                    }
                })
            }
        }
    },
    actions: {
        addcart (context, cartData) {
            axios.post('/api/cart/addCart', {
                params: cartData
            }).then((data) => {
                if (data.data.code === 0) {
                    context.commit('addCartData', data.data.type, data.data.data)
                }
            })
        }
    }
})
export default store

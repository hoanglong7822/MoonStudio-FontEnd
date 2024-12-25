import { createStore } from 'vuex';

export const store = createStore({
    state: {
        count: 0,
        cart: [],
        notification: {
            visible: false,
            message: '',
            imageUrl: '',
        },
    },
    mutations: {
        // Tăng số lượng
        INCREMENT_COUNT(state, payload) {
            state.count += payload;
        },
        // Thêm sản phẩm vào giỏ hàng
        ADD_TO_CART(state, payload) {
            const existingProduct = state.cart.find(
                (item) => item.product_id === payload.product_id && item.size === payload.size,
            );
            if (existingProduct) {
                existingProduct.productInCart = existingProduct.productInCart + 1;
            } else {
                state.cart.push({ ...payload, productInCart: 1 });
            }
        },
        INCREMENT_PRODUCT(state, payload) {
            const product = state.cart.find(
                (item) => item.product_id === payload.product_id && item.size === payload.size,
            );
            product.productInCart = product.productInCart + 1;
        },
        DECREMENT_PRODUCT(state, payload) {
            const product = state.cart.find(
                (item) => item.product_id === payload.product_id && item.size === payload.size,
            );
            product.productInCart = product.productInCart - 1;
            if (product.productInCart < 1) {
                const index = state.cart.findIndex(
                    (item) => item.product_id === payload.product_id && item.size === payload.size,
                );
                state.cart.splice(index, 1);
            }
        },
        // Hiển thị thông báo
        SHOW_NOTIFICATION(state, { message, imageUrl }) {
            state.notification = { visible: true, message, imageUrl };
        },
        // Ẩn thông báo
        HIDE_NOTIFICATION(state) {
            state.notification.visible = false;
        },
    },
    actions: {
        // Tăng số lượng với độ trễ
        incrementCount({ commit }, payload) {
            setTimeout(() => {
                commit('INCREMENT_COUNT', payload);
            }, 1000);
        },
        // Kích hoạt thông báo
        triggerNotification({ commit }, payload) {
            commit('SHOW_NOTIFICATION', payload);
            setTimeout(() => {
                commit('HIDE_NOTIFICATION');
            }, 3000); // Tự động ẩn sau 3 giây
        },
    },
    getters: {
        getProducts: (state) => state.cart,
        notification: (state) => state.notification,
    },
});

export const drawer = {
    namespaced: true,
    state: {
        isDrawerVisible: true
    },
    mutations: {
        setDrawerVisibility(state, isVisible) {
            state.isDrawerVisible = isVisible;
        }
    },
    actions: {
        toggleDrawerVisibility({ commit, state }) {
            commit('setDrawerVisibility', !state.isDrawerVisible);
        }
    },
    getters: {
        isDrawerVisible: state => state.isDrawerVisible
    }
};
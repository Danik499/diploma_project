export default {
    state: {
        loading: false,
        error: null,
        userId: "",
        role: ""
    },
    getters: {
        loading: state => state.loading,
        error: state => state.error,
        userId: state => state.userId,
        role: state => state.role
    },
    mutations: {
        setLoading: (state, loadingState) => state.loading = loadingState,
        setError: (state, errorState) => state.error = errorState,
        setUserId: (state, userId) => state.userId = userId,
        setRole: (state, roleState) => state.role = roleState,
    },
    actions: {
        async registration({ commit, dispatch }, { name, email, password }) {
            try {
                commit("setLoading", true)
                const response = await fetch(`${this.state.serverUrl}/auth/registration`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, email, password, subscription: this.state.subscription
                    })
                })
                let res = await response.json()
                localStorage.setItem("role", res.role)
                localStorage.setItem("userId", res.userId)
                commit("setUserId", res.userId)
                commit("setRole", res.role)
            } catch (error) {
                commit("setError", error)
                dispatch("buildError", "email already in use")
            } finally {
                commit("setLoading", false)
            }
        },
        async login({ commit, dispatch }, { email, password }) {
            try {
                commit("setLoading", true)
                const response = await fetch(`${this.state.serverUrl}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        subscription: await this.state.subscription
                    })
                })
                let res = await response.json()
                localStorage.setItem("role", res.role)
                localStorage.setItem("userId", res.userId)
                commit("setUserId", res.userId)
                commit("setRole", res.role)
            } catch (error) {
                dispatch("buildError", "Check your email or password")
            } finally {
                commit("setLoading", false)
            }
        },
        async logout() {
            try {
                await fetch(`${this.state.serverUrl}/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem("userId"),
                        subscription: await this.state.subscription
                    })
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        buildError({ commit }, message) {
            switch (message) {
                case "email already in use":
                    commit("setError", "This email is already in use")
                    break
                case "Check your email or password":
                    commit("setError", "Check your email or password")
                    break
                default:
                    break
            }
        }
    }
}
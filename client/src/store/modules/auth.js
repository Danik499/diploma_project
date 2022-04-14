export default {
    state: {
        loading: false,
        error: null,
        role: ""
    },
    getters: {
        loading: state => state.loading,
        error: state => state.error,
        role: state => state.role
    },
    mutations: {
        setLoading: (state, loadingState) => state.loading = loadingState,
        setError: (state, errorState) => state.error = errorState,
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
                        name, email, password
                    })
                })
                let res = await response.json()
                localStorage.setItem("role", res.role)
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
                        password
                    })
                })
                let res = await response.json()
                localStorage.setItem("role", res.role)
                commit("setRole", res.role)
            } catch (error) {
                dispatch("buildError", "Check your email or password")
            } finally {
                commit("setLoading", false)
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
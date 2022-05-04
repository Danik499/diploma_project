// import { sendNotification } from "web-push"

export default {
    state: {
        eventId: "",
        events: [],
        rerender: 0
    },
    getters: {
        eventId: store => store.eventId,
        events: store => store.events,
        key: store => store.rerender
    },
    mutations: {
        setEventId: (state, eventId) => state.eventId = eventId,
        setEvents: (state, events) => state.events = events,
        rerender: state => state.rerender += 1
    },
    actions: {
        async create({ commit }, { name }) {
            try {
                const response = await fetch(this.state.serverUrl + "/event/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name
                    })
                })
                const res = await response.json()
                commit("setEventId", res.id)
            } catch (error) {
                throw new Error(error)
            }
        },
        async loadEvents({ commit }) {
            try {
                const response = await fetch(this.state.serverUrl + "/event/load", {
                    method: "GET"
                })
                const res = await response.json()
                commit("setEvents", res)
            } catch (error) {
                throw new Error(error)
            }
        },
        async getSubscriptions({ commit }) {
            try {
                const response = await fetch(this.state.serverUrl + "/event/getSubscriptions?userId=" + localStorage.getItem("userId"), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                const res = await response.json()
                commit("setEvents", res)
            } catch (error) {
                throw new Error(error)
            }
        },
        async searchEvents({ commit }, search) {
            try {
                const response = await fetch(this.state.serverUrl + `/event/search?search=${search}`)
                let events = await response.json()
                commit("setEvents", events)
            } catch (error) {
                throw new Error(error)
            }
        },
        async subscribe({ commit }, subscriptionInfo) {
            commit
            try {
                await fetch(this.state.serverUrl + "/event/subscribe", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(subscriptionInfo)
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        async sendNotification({ commit }, payload) {
            commit
            try {
                await fetch(this.state.serverUrl + "/event/sendNotification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}
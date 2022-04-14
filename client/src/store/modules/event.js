export default {
    state: {
        eventId: "",
        events: []
    },
    getters: {
        eventId: store => store.eventId,
        events: store => store.events
    },
    mutations: {
        setEventId: (state, eventId) => state.eventId = eventId,
        setEvents: (state, events) => state.events = events
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
        }
    }
}
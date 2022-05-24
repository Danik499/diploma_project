export default {
    state: {
        eventId: "",
        events: [],
        notifications: [],
        rerender: 0
    },
    getters: {
        eventId: store => store.eventId,
        events: store => store.events,
        notifications: store => store.notifications,
        key: store => store.rerender
    },
    mutations: {
        setEventId: (state, eventId) => state.eventId = eventId,
        setEvents: (state, events) => state.events = events,
        setNotifications: (state, notifications) => state.notifications = notifications,
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
                let res = await response.json()
                if (res.length > 1 && res[0] === null) res.shift()
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
        async deleteEvent({ commit }, eventInfo) {
            try {
                commit
                await fetch(this.state.serverUrl + "/event/delete?id=" + eventInfo.eventId, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
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
        },
        async getUserNotifications({ commit }) {
            try {
                const response = await fetch(this.state.serverUrl + "/event/getUserNotifications", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId: localStorage.getItem("userId") })
                })
                const notifications = await response.json()
                let unreadCount = 0
                console.log("notifs", notifications)
                for (let n of notifications) {
                    if (!n.isRead) unreadCount++
                    else break
                }
                commit("setNotifications", notifications)
                return unreadCount
            } catch (error) {
                throw new Error(error)
            }
        },
        async readNotifications() {
            try {
                await fetch(this.state.serverUrl + "/event/readNotifications", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId: localStorage.getItem("userId") })
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}
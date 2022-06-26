module.exports = io => {
    let isEmergency = false
    let emergencyText = ""

    io.sockets.on("connection", socket => {
        socket.emit("emergency-info", {
            isEmergency, emergencyText
        })

        socket.on("start-emergency", emergencyInfo => {
            isEmergency = true
            emergencyText = emergencyInfo.emergencyText
            io.sockets.emit("start-emergency", emergencyText)
        })

        socket.on("end-emergency", () => {
            isEmergency = false
            emergencyText = ""
            io.sockets.emit("end-emergency")
        })
    })
}


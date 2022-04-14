module.exports = io => {
    io.sockets.on("connection", socket => {
        console.log("a user connected now");

        socket.on("join-room", room => {
            socket.join(room)
            console.log(`user joined ${room}`)
        })

        socket.on("send-to-room", room => {
            socket.to(room).emit("notification");
        })

        socket.on("emit-event", ({ text, room }) => {
            socket.to(room).emit()
        })
    })
}
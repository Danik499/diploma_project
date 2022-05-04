console.log("Service Worker Loaded...");
let url = ""

self.addEventListener("push", e => {
    const data = e.data.json();
    // console.log("Push Recieved...");
    // url = data.link
    self.registration.showNotification(data.title, {
        body: "Notified by Danik!",
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
});

// self.addEventListener('notificationclick', function (event) {
//     event.notification.close();
//     clients.openWindow(url);
// });
console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: "Notified by Danik!",
    });
    self.clients.matchAll().then(all => all.forEach(client => {
        client.postMessage("test msg");
    }));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    clients.openWindow("/user/history");
});
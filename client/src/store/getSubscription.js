const publicVapidKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
}

async function send() {
    const register = await navigator.serviceWorker.register("/sw.js")

    return await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    // console.log("Push Registered...")

    // Send Push Notification
    //   console.log("Sending Push...");
    //   let test = await fetch("http://192.168.1.101:4000/subscribe", {
    //     method: "POST",
    //     body: JSON.stringify(subscription),
    //     headers: {
    //       "content-type": "application/json"
    //     }
    //   });
    //   console.log("Push Sent...");
    //   test = await test.json()
    //   console.log(test);
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default send()
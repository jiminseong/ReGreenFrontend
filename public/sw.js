// public/sw.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "우이미 알림", {
    body: data.body || "알림 내용이 도착했어요!",
    icon: "/icon.webp",
    badge: "/badge.png",
    data: data.url || "/",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data || "/";
  event.waitUntil(clients.openWindow(urlToOpen));
});

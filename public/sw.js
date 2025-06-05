self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.webp",
      badge: "/badge.webp",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("install", () => {
  self.skipWaiting(); // 설치되자마자 활성화
});

self.addEventListener("activate", () => {
  clients.claim(); // 열린 탭에 바로 적용
});

self.addEventListener("fetch", (event) => {
  // 항상 네트워크에서 최신 리소스를 받음 (캐싱 X)
  event.respondWith(fetch(event.request));
});

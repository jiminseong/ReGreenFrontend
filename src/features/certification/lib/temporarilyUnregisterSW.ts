export const temporarilyUnregisterSW = async (): Promise<void> => {
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;

      await reg.unregister();
      await caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));

      console.log("✅ Service Worker 해제 완료");
    } catch (err) {
      console.error("❌ Service Worker 해제 실패", err);
    }
  }
};

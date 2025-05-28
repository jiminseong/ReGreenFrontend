export const temporarilyUnregisterSW = async (): Promise<void> => {
  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();

      for (const reg of registrations) {
        await reg.unregister();
      }

      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));
    } catch (err) {
      console.error("❌ Service Worker 해제 실패:", err);
    }
  }
};

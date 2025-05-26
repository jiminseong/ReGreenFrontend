export const temporarilyUnregisterSW = async (): Promise<void> => {
  if ("serviceWorker" in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();

      for (const reg of registrations) {
        console.log("🧹 unregistering SW:", reg);
        await reg.unregister();
      }

      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((key) => caches.delete(key)));

      console.log("✅ Service Worker 해제 및 캐시 삭제 완료");
    } catch (err) {
      console.error("❌ Service Worker 해제 실패:", err);
    }
  }
};

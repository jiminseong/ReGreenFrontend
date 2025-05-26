"use server";

import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:wooimiregreen@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY!
);

let subscription: webpush.PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  const serialized = sub.toJSON();

  subscription = {
    endpoint: serialized.endpoint!,
    keys: {
      p256dh: serialized.keys!.p256dh!,
      auth: serialized.keys!.auth!,
    },
  };

  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    console.warn("❌ No subscription available");
    return { success: false };
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "우이미",
        body: message,
        icon: "/192.png",
      })
    );
    return { success: true };
  } catch (err) {
    console.error("🔴 Error sending notification:", err);
    return { success: false };
  }
}

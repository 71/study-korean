import App from "./App.svelte";

if (!DEV) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.info("service worker registered"))
    .catch((err) => console.error("service worker registration failed:", err));
}

new App({
  target: document.getElementById("app")!,
});

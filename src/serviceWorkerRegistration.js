export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log("✅ Service Worker registrado:", registration);
        })
        .catch(err => {
          console.error("❌ Error al registrar el Service Worker:", err);
        });
    });
  }
}
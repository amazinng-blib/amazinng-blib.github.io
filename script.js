// MMak sure service workers are supported

if ('serviceWorker' in navigator) {
  //   console.log('Service worker supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./Sw_cached_site.js')
      .then((reg) => console.log('Service worker Registered'))
      .catch((err) => console.log(`Service worker Error: ${err}`));
  });
}

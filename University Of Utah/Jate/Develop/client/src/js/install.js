const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (promptEvent) {
    promptEvent.prompt();
    const userChoice = await promptEvent.userChoice;
    if (userChoice.outcome === 'accepted') {
      console.log('User downloaded the app');
    } else {
      console.log('User rejected the app');
    }
    window.deferredPrompt = null;
    butInstall.style.display = 'none';
  }
});

window.addEventListener('appinstalled', (event) => {console.log('App installed');});
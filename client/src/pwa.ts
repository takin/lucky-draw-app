// PWA Registration and Management
export function registerPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Check if app is running in standalone mode (installed as PWA)
export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
}

// Request fullscreen mode
export function requestFullscreen(): Promise<void> {
  if (document.documentElement.requestFullscreen) {
    return document.documentElement.requestFullscreen();
  } else if ((document.documentElement as any).webkitRequestFullscreen) {
    return (document.documentElement as any).webkitRequestFullscreen();
  } else if ((document.documentElement as any).msRequestFullscreen) {
    return (document.documentElement as any).msRequestFullscreen();
  }
  return Promise.reject(new Error('Fullscreen not supported'));
}

// Exit fullscreen mode
export function exitFullscreen(): Promise<void> {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    return (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    return (document as any).msExitFullscreen();
  }
  return Promise.reject(new Error('Exit fullscreen not supported'));
}

// Check if currently in fullscreen
export function isFullscreen(): boolean {
  return !!(
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement
  );
}

// Toggle fullscreen mode
export function toggleFullscreen(): Promise<void> {
  return isFullscreen() ? exitFullscreen() : requestFullscreen();
}

// Show install prompt for PWA
export function showInstallPrompt(): void {
  const deferredPrompt = (window as any).deferredPrompt;
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      (window as any).deferredPrompt = null;
    });
  }
}

// Check if install prompt is available
export function canInstallPWA(): boolean {
  return !!(window as any).deferredPrompt;
}

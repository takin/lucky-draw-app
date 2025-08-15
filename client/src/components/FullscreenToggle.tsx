import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2, Monitor, Smartphone } from 'lucide-react';
import { isStandalone, toggleFullscreen, isFullscreen, showInstallPrompt, canInstallPWA } from '../pwa';

export default function FullscreenToggle() {
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Check initial fullscreen state
    setIsFullscreenMode(isFullscreen());
    setIsPWAInstalled(isStandalone());
    setCanInstall(canInstallPWA());

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreenMode(isFullscreen());
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleFullscreenToggle = async () => {
    try {
      await toggleFullscreen();
    } catch (error) {
      console.error('Failed to toggle fullscreen:', error);
    }
  };

  const handleInstallPWA = () => {
    showInstallPrompt();
  };

  return (
    <div className='fixed top-4 right-4 z-50 flex gap-2'>
      {/* PWA Install Button */}
      {canInstall && !isPWAInstalled && (
        <Button
          onClick={handleInstallPWA}
          size='sm'
          className='bg-green-600 hover:bg-green-700 text-white shadow-lg'
          title='Install as App'
        >
          <Smartphone className='w-4 h-4 mr-2' />
          Install
        </Button>
      )}

      {/* PWA Status Indicator */}
      {isPWAInstalled && (
        <div className='flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium'>
          <Monitor className='w-4 h-4' />
          App Mode
        </div>
      )}

      {/* Fullscreen Toggle */}
      <Button
        onClick={handleFullscreenToggle}
        size='sm'
        variant='outline'
        className='bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg'
        title={isFullscreenMode ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        {isFullscreenMode ? <Minimize2 className='w-4 h-4' /> : <Maximize2 className='w-4 h-4' />}
      </Button>
    </div>
  );
}

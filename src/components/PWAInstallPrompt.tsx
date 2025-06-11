import * as React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = React.useState(false);

  React.useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if PWA is already installed
    const checkPWAInstalled = () => {
      // Check if running in standalone mode (PWA is installed)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // Check if running as PWA on mobile
      const isInWebAppiOS = (window.navigator as any).standalone === true;
      
      return isStandalone || isInWebAppiOS;
    };

    const pwaInstalled = checkPWAInstalled();
    setIsPWAInstalled(pwaInstalled);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt if user hasn't dismissed it permanently
      const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-dismissed-permanently');
      if (!hasSeenPrompt) {
        setShowInstallPrompt(true);
      }
    };

    // For iOS or if PWA is installed, show install prompt based on user preference
    if (iOS || pwaInstalled) {
      const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-dismissed-permanently');
      if (!hasSeenPrompt) {
        setShowInstallPrompt(true);
      }
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsPWAInstalled(true);
      // Keep showing prompt unless user dismisses permanently
      const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-dismissed-permanently');
      if (!hasSeenPrompt) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // For iOS, show instructions
      setShowInstallPrompt(false);
      localStorage.setItem('pwa-install-prompt-dismissed-permanently', 'true');
      return;
    }

    if (!deferredPrompt && !isPWAInstalled) return;

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsPWAInstalled(true);
      }
      
      setDeferredPrompt(null);
    }
    
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-prompt-dismissed-permanently', 'true');
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Set a temporary dismissal (will show again on next visit unless permanently dismissed)
    localStorage.setItem('pwa-install-prompt-seen', 'true');
  };

  const handleDismissPermanently = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-prompt-dismissed-permanently', 'true');
  };

  // Show prompt based on conditions
  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-background border rounded-lg shadow-lg p-4 w-full animate-fade-in">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img 
              src="/lovable-uploads/d3e2c1ed-3a94-410a-92a5-4126a5366ca6.png" 
              alt="Sports Hub Logo" 
              className="h-8 w-8 rounded flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm truncate">
                {isPWAInstalled ? 'Sports Hub PWA Available' : 'Install Sports Hub'}
              </h3>
              <p className="text-xs text-muted-foreground leading-tight">
                {isIOS 
                  ? "Tap share → 'Add to Home Screen'"
                  : isPWAInstalled 
                    ? "PWA is ready for quick access"
                    : "Install for quick access"
                }
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2 mt-3">
          <Button onClick={handleInstallClick} size="sm" className="flex-1 text-xs">
            {isIOS ? "Got it" : isPWAInstalled ? "Open PWA" : "Install"}
          </Button>
          <Button variant="outline" onClick={handleDismissPermanently} size="sm" className="flex-1 text-xs">
            Don't show again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;

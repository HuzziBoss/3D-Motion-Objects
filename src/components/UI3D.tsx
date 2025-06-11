
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const UI3D = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Header */}
      <div 
        className={`absolute top-6 left-6 right-6 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } pointer-events-auto`}
      >
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                3D WebGL Experience
              </h1>
              <p className="text-muted-foreground">
                Interactive 3D scene built with React Three Fiber
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="animate-pulse-glow">
                WebGL
              </Badge>
              <Badge variant="secondary" className="animate-pulse-glow">
                Three.js
              </Badge>
              <Badge variant="secondary" className="animate-pulse-glow">
                R3F
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Control Panel */}
      <div 
        className={`absolute bottom-6 left-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } pointer-events-auto`}
      >
        <Card className="glass-effect p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Controls
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Click and drag to rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Scroll to zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>Auto-rotation enabled</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Panel */}
      <div 
        className={`absolute bottom-6 right-6 transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } pointer-events-auto`}
      >
        <Card className="glass-effect p-6 space-y-4 max-w-xs">
          <h3 className="text-lg font-semibold text-foreground">
            Features
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mt-1 animate-pulse"></div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Dynamic Materials</h4>
                <p className="text-xs text-muted-foreground">Distortion and metallic effects</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mt-1 animate-pulse"></div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Particle Systems</h4>
                <p className="text-xs text-muted-foreground">2000+ animated particles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mt-1 animate-pulse"></div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Real-time Lighting</h4>
                <p className="text-xs text-muted-foreground">Dynamic shadows and reflections</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Loading Indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Loading 3D Scene...</span>
        </div>
      </div>
    </div>
  );
};

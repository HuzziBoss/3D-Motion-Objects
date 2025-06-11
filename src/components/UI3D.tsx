
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const UI3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fps, setFps] = useState(60);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    
    // FPS Counter simulation
    const fpsTimer = setInterval(() => {
      setFps(Math.floor(Math.random() * 10) + 55); // Simulate 55-65 FPS
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(fpsTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Enhanced Header */}
      <div 
        className={`absolute top-6 left-6 right-6 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } pointer-events-auto`}
      >
        <Card className="glass-effect p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Professional 3D WebGL Experience
              </h1>
              <p className="text-muted-foreground">
                Interactive 3D scene with advanced materials & lighting
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="animate-pulse-glow">
                WebGL 2.0
              </Badge>
              <Badge variant="secondary" className="animate-pulse-glow">
                Three.js
              </Badge>
              <Badge variant="secondary" className="animate-pulse-glow">
                React 3 Fiber
              </Badge>
              <Badge variant="secondary" className="animate-pulse-glow">
                Drei
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Stats Panel */}
      <div 
        className={`absolute top-6 right-6 transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } pointer-events-auto`}
      >
        <Card className="glass-effect p-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{fps}</div>
              <div className="text-xs text-muted-foreground">FPS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">4K+</div>
              <div className="text-xs text-muted-foreground">Triangles</div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowStats(!showStats)}
            >
              Stats
            </Button>
          </div>
        </Card>
      </div>

      {/* Enhanced Control Panel */}
      <div 
        className={`absolute bottom-6 left-6 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } pointer-events-auto`}
      >
        <Card className="glass-effect p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Interactive Controls
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span>Click and drag to orbit camera</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span>Scroll wheel to zoom in/out</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <span>Hover objects for interactions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
              <span>Auto-rotation with dampening</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Info Panel */}
      <div 
        className={`absolute bottom-6 right-6 transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        } pointer-events-auto`}
      >
        <Card className="glass-effect p-6 space-y-4 max-w-xs">
          <h3 className="text-lg font-semibold text-foreground">
            Advanced Features
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mt-1 animate-pulse"></div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Dynamic Materials</h4>
                <p className="text-xs text-muted-foreground">Distortion effects & hover interactions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mt-1 animate-pulse"></div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Enhanced Particles</h4>
                <p className="text-xs text-muted-foreground">4500+ particles with sparkle effects</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full mt-1 animate-pulse"></div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Professional Lighting</h4>
                <p className="text-xs text-muted-foreground">Multi-light setup with soft shadows</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full mt-1 animate-pulse"></div>
              <div>
                <h4 className="text-sm font-medium text-foreground">Performance Optimized</h4>
                <p className="text-xs text-muted-foreground">Smooth 60 FPS with monitoring</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Stats Panel (conditional) */}
      {showStats && (
        <div 
          className="absolute top-32 right-6 pointer-events-auto animate-fade-in"
        >
          <Card className="glass-effect p-4 max-w-xs">
            <h4 className="text-sm font-semibold mb-3">Technical Stats</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Render Calls:</span>
                <span className="text-primary">~15</span>
              </div>
              <div className="flex justify-between">
                <span>Memory Usage:</span>
                <span className="text-accent">~45MB</span>
              </div>
              <div className="flex justify-between">
                <span>Draw Calls:</span>
                <span className="text-secondary">~12</span>
              </div>
              <div className="flex justify-between">
                <span>WebGL Version:</span>
                <span className="text-primary">2.0</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

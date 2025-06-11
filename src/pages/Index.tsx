
import { Scene3D } from '@/components/Scene3D';
import { UI3D } from '@/components/UI3D';
import { Suspense } from 'react';

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-primary/10">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
      <p className="text-lg font-medium gradient-text">Loading 3D Experience...</p>
      <p className="text-sm text-muted-foreground">Initializing WebGL renderer</p>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <Suspense fallback={<LoadingFallback />}>
        <Scene3D />
      </Suspense>
      <UI3D />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default Index;

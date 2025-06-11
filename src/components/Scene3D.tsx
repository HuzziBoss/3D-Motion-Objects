
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Text, MeshDistortMaterial, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.5;
      
      // Scale effect on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={position} 
        castShadow 
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={hovered ? '#ffffff' : color}
          distort={hovered ? 0.5 : 0.3}
          speed={hovered ? 4 : 2}
          roughness={0.2}
          metalness={0.8}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
    </Float>
  );
};

const GeometricShape = ({ position, shape = 'box' }: { position: [number, number, number], shape?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += hovered ? 0.02 : 0.01;
      meshRef.current.rotation.y += hovered ? 0.01 : 0.005;
      meshRef.current.rotation.z += hovered ? 0.016 : 0.008;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1]} />;
      default:
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
    }
  }, [shape]);

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh 
        ref={meshRef} 
        position={position} 
        castShadow 
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometry}
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#8b5cf6'}
          metalness={hovered ? 1 : 0.7}
          roughness={hovered ? 0.1 : 0.2}
          emissive={hovered ? '#8b5cf6' : '#4c1d95'}
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </mesh>
    </Float>
  );
};

const EnhancedParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const points2Ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, []);

  const particlesPosition2 = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
    if (points2Ref.current) {
      points2Ref.current.rotation.x = -state.clock.elapsedTime * 0.03;
      points2Ref.current.rotation.y = -state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#06b6d4"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.6}
        />
      </points>
      
      <points ref={points2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition2.length / 3}
            array={particlesPosition2}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.01}
          color="#8b5cf6"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.4}
        />
      </points>
      
      <Sparkles count={100} scale={50} size={6} speed={0.4} color="#ffffff" />
    </>
  );
};

const PerformanceMonitor = () => {
  const { gl } = useThree();
  
  useFrame(() => {
    // Monitor performance and log to console
    console.log(`WebGL Renderer Info: ${gl.info.render.triangles} triangles, ${gl.info.render.calls} draw calls`);
  });
  
  return null;
};

const Scene3DContent = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={5}
        maxDistance={25}
        autoRotate={true}
        autoRotateSpeed={0.3}
        dampingFactor={0.05}
        enableDamping={true}
      />
      
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} color="#6366f1" intensity={0.8} />
      <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.8} />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5} 
        color="#06b6d4"
        castShadow
      />
      
      {/* Environment and Background */}
      <Environment preset="night" />
      <Stars radius={300} depth={60} count={1000} factor={7} saturation={0.5} fade />
      
      {/* 3D Models with enhanced positioning */}
      <AnimatedSphere position={[0, 0, 0]} color="#6366f1" speed={1} />
      <AnimatedSphere position={[4, 2, -2]} color="#8b5cf6" speed={1.5} />
      <AnimatedSphere position={[-4, -1, 2]} color="#06b6d4" speed={0.8} />
      <AnimatedSphere position={[2, -3, -4]} color="#f59e0b" speed={1.2} />
      
      <GeometricShape position={[6, 0, 0]} shape="torus" />
      <GeometricShape position={[-6, 2, -3]} shape="octahedron" />
      <GeometricShape position={[0, -4, 3]} shape="dodecahedron" />
      <GeometricShape position={[-3, 4, 1]} shape="box" />
      <GeometricShape position={[4, -2, 4]} shape="torus" />
      
      {/* Enhanced Particle Field */}
      <EnhancedParticleField />
      
      {/* 3D Text */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <Text
          position={[0, 3, 0]}
          fontSize={1.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          3D Experience
        </Text>
      </Float>
      
      {/* Performance Monitor */}
      <PerformanceMonitor />
    </>
  );
};

export const Scene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap }
        }}
        camera={{ position: [0, 0, 10], fov: 60 }}
        onCreated={() => console.log("Enhanced 3D Scene loaded successfully")}
      >
        <Scene3DContent />
      </Canvas>
    </div>
  );
};

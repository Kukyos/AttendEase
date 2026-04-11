import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATH } from '../constants';

const CustomModel = ({ path }: { path: string }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={2} />;
};

const PlaceholderModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Main Enclosure */}
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <boxGeometry args={[2, 3.5, 1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0.8, 0.51]}>
          <planeGeometry args={[1.5, 0.8]} />
          <meshStandardMaterial color="#000000" emissive="#0ea5e9" emissiveIntensity={0.2} />
        </mesh>

        {/* Scanner Window */}
        <mesh position={[0, -0.5, 0.51]}>
          <planeGeometry args={[1.2, 0.4]} />
          <meshStandardMaterial color="#333" emissive="#ff0000" emissiveIntensity={0.1} />
        </mesh>

        {/* Status LED */}
        <mesh position={[0.6, 1.4, 0.51]}>
          <circleGeometry args={[0.08]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2} />
        </mesh>
      </group>
    </Float>
  );
};

export const DeviceModelViewer = ({ className = "" }: { className?: string }) => {
  // Check if the model path is the default placeholder or a real file
  const isCustomModel = MODEL_PATH && !MODEL_PATH.includes('placeholder_box');

  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="city" />
        
        <Suspense fallback={<PlaceholderModel />}>
           {isCustomModel ? (
             <ErrorBoundary fallback={<PlaceholderModel />}>
               <CustomModel path={MODEL_PATH} />
             </ErrorBoundary>
           ) : (
             <PlaceholderModel />
           )}
        </Suspense>
        
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 font-mono bg-black/50 px-2 py-1 rounded pointer-events-none">
        {isCustomModel ? "Custom Model Loaded" : "Interactive 3D View (Placeholder)"}
      </div>
    </div>
  );
};

// Simple Error Boundary for 3D model loading failures
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

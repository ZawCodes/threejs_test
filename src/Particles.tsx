import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles: React.FC = () => {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 5000;
    const spread = 20; // Increased the spread value to cover more of the viewport
  
    // Create random positions for particles
    const positions = useMemo(() => {
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread; // X position
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread; // Y position
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread; // Z position
      }
      return positions;
    }, [particleCount]);
  
    useFrame(() => {
      // Animate the particles by rotating them slightly each frame
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
      }
    });
  
    return (
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={positions.length / 3} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.01} />
      </points>
    );
};

export default Particles;

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import avatar from "./assets/avatar.png";
import { Html, PerspectiveCamera } from "@react-three/drei";
import Particles from "./Particles";
import "./style.css";

// Neon Light Component
const NeonLight: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return <pointLight color="#A800F6" intensity={25} decay={0} position={position} />;
};


// Main Background Component
const Background: React.FC = () => {
  const [cursorPos, setCursorPos] = useState<[number, number, number]>([5, 10, 7]);
  const targetPos = useRef<[number, number, number]>([5, 10, 7]);

  const handleMouseMove = (event: MouseEvent) => {
    // Calculate target position relative to the window size
    const x = ((event.clientX / window.innerWidth) * 2 - 1) * 5;
    const y = -((event.clientY / window.innerHeight) * 2 - 1) * 5;
    targetPos.current = [x, y, 7];
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPos((prevPos) => {
        const [tx, ty] = targetPos.current;
        const newX = prevPos[0] + (tx - prevPos[0]) * 0.05;
        const newY = prevPos[1] + (ty - prevPos[1]) * 0.05;
        return [newX, newY, 0];
      });
    }, 16); // Approx 60 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />

      <NeonLight position={cursorPos} />

      <Particles />

      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#000" />
    <Html position={[0, 0.5, 0]} center>
          <div className="avatar-container">
            <img src={avatar} alt="Avatar" className="avatar-image" />
          </div>
        </Html>
      </mesh>
    </Canvas>
  );
};

export default Background;

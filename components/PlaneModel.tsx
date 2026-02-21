"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlaneModelProps {
  position?: [number, number, number];
  scale?: number;
}

export default function PlaneModel({
  position = [0, 0, 0],
  scale = 1,
}: PlaneModelProps) {
  const planeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (planeRef.current) {
      planeRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      planeRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={planeRef} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[0.3, 0.1, 0.8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      <mesh position={[-0.15, 0, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.15, 0, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

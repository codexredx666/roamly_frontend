"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HotelModelProps {
  position?: [number, number, number];
  scale?: number;
}

export default function HotelModel({
  position = [0, 0, 0],
  scale = 1,
}: HotelModelProps) {
  const hotelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (hotelRef.current) {
      hotelRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={hotelRef} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[0.4, 0.6, 0.4]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0, 0.1, 0.25]}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0, -0.1, 0.25]}>
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

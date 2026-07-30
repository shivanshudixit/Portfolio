"use client";

import { Float, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// --- Configuration Constants ---
const NODE_COUNT = 32;
const MAX_LINKS = 45;
const MAX_LINK_DISTANCE = 4.05;
const SEED_MULTIPLIER = 132.37;

const SPATIAL_SPREAD_X = 16;
const SPATIAL_SPREAD_Y = 9;
const SPATIAL_SPREAD_Z = 5;

// Rotation speeds and influences
const BASE_ROTATION_Y = 0.018;
const POINTER_INFLUENCE_X = 0.04;
const POINTER_INFLUENCE_Y = 0.025;

// Particle effect constants
const SPARKLES_COUNT = 38;
const SPARKLES_SPEED = 0.11;
const SPARKLES_OPACITY = 0.22;

type Node = [number, number, number];

function Network() {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo<Node[]>(() => {
    // Pseudo-random number generator based on sine waves for deterministic placement
    const generateSeededRandom = (index: number) => {
      const value = Math.sin(index * SEED_MULTIPLIER) * 10000;
      return value - Math.floor(value);
    };

    return Array.from({ length: NODE_COUNT }, (_, index) => {
      // Offset indices to ensure uncorrelated pseudo-random values for each axis
      const randomX = generateSeededRandom(index);
      const randomY = generateSeededRandom(index + 41);
      const randomZ = generateSeededRandom(index + 83);

      return [
        (randomX - 0.5) * SPATIAL_SPREAD_X,
        (randomY - 0.5) * SPATIAL_SPREAD_Y,
        (randomZ - 0.5) * SPATIAL_SPREAD_Z,
      ];
    });
  }, []);

  const links = useMemo(() => {
    const result: [Node, Node][] = [];
    
    // Create connections between nodes that are close to each other in 3D space
    nodes.forEach((node, index) => {
      nodes.slice(index + 1).forEach((otherNode) => {
        const dx = node[0] - otherNode[0];
        const dy = node[1] - otherNode[1];
        const dz = node[2] - otherNode[2];
        const distance = Math.hypot(dx, dy, dz);
        
        if (distance < MAX_LINK_DISTANCE && result.length < MAX_LINKS) {
          result.push([node, otherNode]);
        }
      });
    });
    
    return result;
  }, [nodes]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    
    // Apply continuous rotation based on time, subtly influenced by pointer position
    group.current.rotation.y = clock.getElapsedTime() * BASE_ROTATION_Y + pointer.x * POINTER_INFLUENCE_X;
    group.current.rotation.x = pointer.y * POINTER_INFLUENCE_Y;
  });

  return (
    <group ref={group}>
      {/* Render the connecting lines between close nodes */}
      {links.map(([start, end], index) => (
        <Line 
          key={index} 
          points={[start, end]} 
          color="#72bfff" 
          transparent 
          opacity={0.12} 
          lineWidth={0.65} 
        />
      ))}
      
      {/* Render individual nodes as floating spheres */}
      {nodes.map((position, index) => {
        // Highlight every 7th node to create visual hierarchy and interest
        const isHighlighted = index % 7 === 0;
        const radius = isHighlighted ? 0.075 : 0.036;
        const color = isHighlighted ? "#d3ecff" : "#76c4ff";
        const opacity = isHighlighted ? 0.9 : 0.55;
        
        // Slightly vary the float speed for each node for a more organic feel
        const floatSpeed = 0.55 + (index % 3) * 0.16;

        return (
          <Float 
            key={index} 
            speed={floatSpeed} 
            rotationIntensity={0} 
            floatIntensity={0.22}
          >
            <mesh position={position}>
              <sphereGeometry args={[radius, 12, 12]} />
              <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={opacity} 
              />
            </mesh>
          </Float>
        );
      })}
      
      {/* Add ambient environmental particles */}
      <Sparkles 
        count={SPARKLES_COUNT} 
        scale={[16, 8, 4]} 
        size={1.2} 
        speed={SPARKLES_SPEED} 
        opacity={SPARKLES_OPACITY} 
        color="#8ed3ff" 
      />
    </group>
  );
}

export function NodeNetwork() {
  return (
    <Canvas 
      aria-hidden="true" 
      dpr={[1, 1.5]} 
      camera={{ position: [0, 0, 10], fov: 48 }} 
      gl={{ 
        alpha: true, 
        antialias: false, 
        powerPreference: "high-performance" 
      }}
    >
      <Network />
    </Canvas>
  );
}

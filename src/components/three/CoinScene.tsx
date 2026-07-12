"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function useCoinTexture(label: string, fg: string, bg: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(128, 128, 124, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(128, 128, 108, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = fg;
    ctx.font = "700 128px 'Arial', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 130, 138);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [label, fg, bg]);
}

type CoinProps = {
  position: [number, number, number];
  label: string;
  bg: string;
  speed?: number;
  scale?: number;
};

function Coin({ position, label, bg, speed = 1, scale = 1 }: CoinProps) {
  const ref = useRef<THREE.Group>(null);
  const texture = useCoinTexture(label, "#ffffff", bg);

  // Spin around the vertical axis; the face-normal is reoriented toward the
  // camera below, so this reads as a coin flipping face-on rather than
  // spinning edge-on (which is invisible from a front-facing camera).
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5 * speed;
  });

  return (
    <Float speed={1.3 * speed} rotationIntensity={0.4} floatIntensity={1.3}>
      <group ref={ref} position={position} scale={scale}>
        <group rotation={[Math.PI / 2.4, 0, 0.12]}>
          <mesh>
            <cylinderGeometry args={[1, 1, 0.22, 64]} />
            <meshStandardMaterial color={bg} metalness={0.75} roughness={0.28} />
          </mesh>
          <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.98, 64]} />
            <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.115, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.98, 64]} />
            <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -1.6]} scale={2.6}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#8a3ffc"
        emissive="#5d1abf"
        emissiveIntensity={0.4}
        distort={0.35}
        speed={1.4}
        roughness={0.15}
        metalness={0.4}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default function CoinScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 7], fov: 42 }}
      className="!touch-none"
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.7} />
      <pointLight position={[-5, -3, -2]} intensity={0.9} color="#a06dff" />
      <pointLight position={[3, -2, 3]} intensity={0.6} color="#ffcf5c" />
      <hemisphereLight args={["#a06dff", "#1c0a3e", 0.6]} />

      <Suspense fallback={null}>
        <GlowOrb />
        <Coin position={[-1.9, 0.7, 0.6]} label="₿" bg="#f4b73b" speed={0.9} scale={1.05} />
        <Coin position={[1.7, -0.5, 1]} label="Ξ" bg="#8a3ffc" speed={1.2} scale={0.85} />
        <Coin position={[0.4, 1.3, -0.4]} label="K" bg="#25d0b1" speed={1.05} scale={0.68} />
      </Suspense>
    </Canvas>
  );
}

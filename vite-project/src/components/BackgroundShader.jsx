import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ShaderMaterial = () => {
  const materialRef = useRef();
  const timeRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#0cffe1') },  // Primary
      uColor2: { value: new THREE.Color('#7928ca') },  // Secondary
      uColor3: { value: new THREE.Color('#080d21') },  // Background
    }),
    []
  );

  useFrame((state, delta) => {
    timeRef.current += delta * 0.2;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      
      // Create waves
      float wave1 = sin(uv.x * 10.0 + uTime) * 0.05;
      float wave2 = sin(uv.y * 8.0 + uTime * 0.8) * 0.05;
      
      // Circular gradient
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(uv, center);
      
      // Create noise
      float n = noise(uv * 5.0 + uTime * 0.2) * 0.1;
      
      // Combine effects
      float t = sin(dist * 10.0 - uTime) * 0.5 + 0.5;
      t = t + wave1 + wave2 + n;
      t = smoothstep(0.0, 1.0, t);
      
      // Mix colors
      vec3 color = mix(uColor3, mix(uColor1, uColor2, t), t * 0.4);
      
      // Add stars
      float stars = step(0.98, noise(uv * 500.0)) * 0.5;
      color += stars;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const BackgroundShader = () => {
  return (
    <Canvas className="background-shader">
      <ShaderMaterial />
    </Canvas>
  );
};

export default BackgroundShader; 
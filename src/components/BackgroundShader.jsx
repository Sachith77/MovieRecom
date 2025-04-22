import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ShaderMaterial = () => {
  const materialRef = useRef();
  const timeRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#0cffe1') },  // Teal accent
      uColor2: { value: new THREE.Color('#7928ca') },  // Purple accent
      uColor3: { value: new THREE.Color('#080808') },  // Deep black
      uColor4: { value: new THREE.Color('#111111') },  // Dark charcoal
    }),
    []
  );

  useFrame((state, delta) => {
    timeRef.current += delta * 0.15; // Slow down animation for more subtle effect
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
    uniform vec3 uColor4;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      
      // Create more subtle waves
      float wave1 = sin(uv.x * 5.0 + uTime * 0.3) * 0.03;
      float wave2 = sin(uv.y * 4.0 + uTime * 0.2) * 0.03;
      
      // Circular gradient
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(uv, center);
      
      // Create subtle noise
      float n = noise(uv * 3.0 + uTime * 0.1) * 0.06;
      
      // Combine effects
      float t = sin(dist * 5.0 - uTime * 0.2) * 0.5 + 0.5;
      t = t + wave1 + wave2 + n;
      t = smoothstep(0.0, 1.0, t);
      
      // Mix colors - more subtle with black dominance
      vec3 baseColor = mix(uColor3, uColor4, t * 0.7);
      vec3 accentColor = mix(uColor1, uColor2, t);
      vec3 color = mix(baseColor, accentColor, 0.08 + 0.04 * sin(uTime * 0.1)); // Very subtle accent
      
      // Add subtle dark bands
      float bands = smoothstep(0.4, 0.6, fract(uv.y * 10.0 - uTime * 0.05)) * 0.03;
      color = mix(color, uColor3, bands);
      
      // Add more sparse and subtle stars
      float stars = step(0.992, noise(uv * 500.0)) * 0.3 * (0.5 + 0.5 * sin(uTime + uv.x * 10.0));
      color += vec3(stars);
      
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
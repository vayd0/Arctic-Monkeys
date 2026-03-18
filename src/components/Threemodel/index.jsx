import { useEffect, useRef } from "react";
import * as THREE from "three";

const halftoneShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2() },
    dotSize: { value: 6.0 },
    blend: { value: 0.6 },
    angle: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float dotSize;
    uniform float angle;
    uniform float blend;
    varying vec2 vUv;

    vec2 rotate(vec2 v, float a) {
      float s = sin(a), c = cos(a);
      return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
    }

    void main() {
      vec2 px = vUv * resolution;
      vec2 rotPx = rotate(px, angle);
      vec2 cell = floor(rotPx / dotSize);
      vec2 cellCenter = (cell + 0.5) * dotSize;
      vec2 cellCenterOrig = rotate(cellCenter, -angle);
      vec2 sampleUv = cellCenterOrig / resolution;
      vec4 color = texture2D(tDiffuse, clamp(sampleUv, 0.0, 1.0));
      float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      float radius = sqrt(luma) * dotSize * 0.5;
      vec2 localPos = rotPx - (cell + 0.5) * dotSize;
      float dist = length(localPos);
      float d = smoothstep(radius + 0.5, radius - 0.5, dist);
      // Modulation : conserve la couleur originale, les points creusent légèrement
      vec3 boosted = color.rgb * 2.2;
      gl_FragColor = vec4(boosted * mix(1.0, d, blend), color.a > 0.0 || luma > 0.01 ? 1.0 : 0.0);
    }
  `,
};

export default function ThreeModel({ progressRef, mirror = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4);

    scene.add(new THREE.AmbientLight(0xffffff, 3));
    const dir = new THREE.DirectionalLight(0xffffff, 6);
    dir.position.set(mirror ? -3 : 3, 5, 3);
    scene.add(dir);
    const fill = new THREE.DirectionalLight(0xffffff, 3);
    fill.position.set(mirror ? 3 : -3, -2, -3);
    scene.add(fill);
    const front = new THREE.DirectionalLight(0xffffff, 4);
    front.position.set(0, 0, 5);
    scene.add(front);

    const pivot = new THREE.Group();
    pivot.rotation.set(-1.34159, -3.11159, -3.14159);
    pivot.position.set(0.45, -0.3, -2.38);
    scene.add(pivot);

    let composer = null;
    Promise.all([
      import("three/examples/jsm/postprocessing/EffectComposer.js"),
      import("three/examples/jsm/postprocessing/RenderPass.js"),
      import("three/examples/jsm/postprocessing/ShaderPass.js"),
    ]).then(([{ EffectComposer }, { RenderPass }, { ShaderPass }]) => {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const halftonePass = new ShaderPass(halftoneShader);
      halftonePass.uniforms.resolution.value.set(canvas.clientWidth, canvas.clientHeight);
      composer.addPass(halftonePass);
      window._halftonePass = halftonePass;
    });

    let model = null;
    let mixer = null;
    const clock = new THREE.Clock();

    import("three/examples/jsm/loaders/GLTFLoader.js").then(({ GLTFLoader }) => {
      new GLTFLoader().load(
        "/3D.glb",
        (gltf) => {
          model = gltf.scene;
          const box    = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size   = box.getSize(new THREE.Vector3());
          const maxSize = Math.max(size.x, size.y, size.z);
          const sc = 3.6 / maxSize;
          model.scale.setScalar(sc);
          model.position.copy(center).multiplyScalar(-sc);
          if (mirror) model.scale.x *= -1;
          pivot.add(model);
          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach(c => mixer.clipAction(c).play());
          }
        },
        undefined,
        () => {
          const geo = new THREE.IcosahedronGeometry(1, 1);
          const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });
          model = new THREE.Mesh(geo, mat);
          pivot.add(model);
        }
      );
    });

    const BASE_ROT = { x: -1.34159, y: -3.11159, z: -3.14159 };
    const BASE_FOV = 45;

    let rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const t = progressRef?.current ?? 0;
      const e = clock.getElapsedTime();

      pivot.rotation.x = BASE_ROT.x - t * 0.6;
      pivot.rotation.y = BASE_ROT.y;
      pivot.rotation.z = BASE_ROT.z + e * 0.25;

      // Léger zoom au scroll
      camera.fov = BASE_FOV - t * 6;
      camera.updateProjectionMatrix();

      if (mixer) mixer.update(clock.getDelta());
      if (composer) composer.render();
      else renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (composer) {
        composer.setSize(w, h);
        if (window._halftonePass) window._halftonePass.uniforms.resolution.value.set(w, h);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      delete window._halftonePass;
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

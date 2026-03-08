import { useEffect, useRef } from "react";
import * as THREE from "three";

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

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(mirror ? -3 : 3, 5, 3);
    scene.add(dir);
    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(mirror ? 3 : -3, -2, -3);
    scene.add(fill);

    let model = null;
    let mixer = null;
    const clock = new THREE.Clock();

    import("three/examples/jsm/loaders/GLTFLoader.js").then(({ GLTFLoader }) => {
      new GLTFLoader().load(
        "/model.glb",
        (gltf) => {
          model = gltf.scene;
          const box    = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size   = box.getSize(new THREE.Vector3());
          model.position.sub(center);
          model.scale.setScalar(2.5 / Math.max(size.x, size.y, size.z));
          if (mirror) model.scale.x *= -1;
          scene.add(model);
          if (gltf.animations.length) {
            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach(c => mixer.clipAction(c).play());
          }
        },
        undefined,
        () => {
          // fallback
          const geo = new THREE.IcosahedronGeometry(1, 1);
          const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });
          model = new THREE.Mesh(geo, mat);
          scene.add(model);
        }
      );
    });

    let rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const t = progressRef?.current ?? 0;
      const e = clock.getElapsedTime();
      if (model) {
        model.rotation.y = e * 0.4 + t * Math.PI * 2 * (mirror ? -1 : 1);
        model.rotation.x = Math.sin(e * 0.3) * 0.3 + t * 0.5;
      }
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
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
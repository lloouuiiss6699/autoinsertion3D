import * as THREE from './js/three.module.min.js';
import { CSS3DRenderer } from './js/CSS3DRenderer.js';
import { OrbitControls } from './js/OrbitControls.js';

// Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.position.set(0, 300, 1000);

// Renderer
const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 500;
controls.maxDistance = 3000;
controls.enablePan = true;

// Wall positions: back, left, right
const wallPositions = [
  { x: 0, y: 300, z: -500, ry: 0 },         // Back wall
  { x: -600, y: 300, z: 0, ry: Math.PI / 2 }, // Left wall
  { x: 600, y: 300, z: 0, ry: -Math.PI / 2 }  // Right wall
];

wallPositions.forEach(pos => {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://autoinsertion.me'; // Your live collage site
  const cssObject = new THREE.CSS3DObject(iframe);
  cssObject.position.set(pos.x, pos.y, pos.z);
  cssObject.rotation.y = pos.ry;
  scene.add(cssObject);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

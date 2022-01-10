import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const devRoot = document.getElementById('_dev_landing_root');

export const mount = (el: HTMLElement) => {
  // Always needed 3: scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 30;
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight );
  el.appendChild(renderer.domElement);

  // 3 needed to create an object: mesh, geometry, material
  const moon = new THREE.Mesh(
    // new THREE.TorusGeometry(3, 1, 16, 50),
    new THREE.SphereGeometry(3,50,50),
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load('https://res.cloudinary.com/vg9lab/image/upload/v1641758301/samples/landscapes/moon_jmhisr.jpg'),
    }), // require light
  );
  scene.add(moon);

  const light1 = new THREE.PointLight(0xffffff);
  light1.position.set(20,20,20);
  scene.add(
    light1,
    new THREE.AmbientLight(0xffffff),
  );

  function addStar() {
    const star = new THREE.Mesh(new THREE.SphereGeometry(.25, 8, 8), new MeshStandardMaterial({color:0xffffff}));
    const [x,y,z] = Array(3).fill(1).map(() => THREE.MathUtils.randFloatSpread(100)); // -50,50
    star.position.set(x,y,z-50);
    scene.add(star);
  }
  Array(200).fill(0).forEach(addStar);

  const starTexture = new THREE.TextureLoader().load('https://res.cloudinary.com/vg9lab/image/upload/v1641757052/samples/landscapes/stars_mqcqjj.jpg');
  scene.background = starTexture;

  let controls: OrbitControls|null = null;
  if (devRoot) {
    scene.add(new THREE.GridHelper(200,50));
    controls = new OrbitControls(camera, renderer.domElement);
  }

  function animate() {
    requestAnimationFrame( animate );
    
    moon.rotation.x += 0.01;
    moon.rotation.y += 0.01;

    controls && controls.update()

    renderer.render( scene, camera ); // draw
  }
  animate();

  document.body.onscroll = () => {
    const t = document.body.getBoundingClientRect().top; // how far scrolled -> negtive
    console.log('= = >', t);
    camera.position.z = t * -0.1 + 30;
    camera.position.x = t * -0.001;
    camera.position.y = t * -0.002;
  }
}

if (devRoot) {
  mount(devRoot);
}

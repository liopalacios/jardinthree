import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//lados
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const geometryBarRight = new THREE.BoxGeometry(4,4,4);
// cubo
const cubo = new THREE.Mesh(geometryBarRight, material);
cubo.position.x = 5.7;
cubo.position.y = -0.5 ;
scene.add(cubo);
light(scene);

camera.position.z = 6;
camera.position.y = 8;

camera.lookAt(cubo.position)
function light(scene) {
    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 1, 1, 1 );
    scene.add( spotLight );

    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    scene.add( spotLightHelper );
}
function animate() {
	requestAnimationFrame( animate );

	cubo.rotation.x += 0.01;
	cubo.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

renderer.render(scene, camera);

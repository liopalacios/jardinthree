import * as THREE from 'three';
import * as dat from 'dat.gui';

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
    
    house(scene);
    
    const geometryPlane = new THREE.PlaneGeometry( 16,16);
    const materialPlane = new THREE.MeshLambertMaterial( { color: 0x004488, wireframe: false } );
    var plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);


    camera.position.z = 6;
    camera.position.y = 8;
    camera.position.x = -16;
    light(scene);
    camera.lookAt(scene.position);

    var controls = {
        rotationSpeed: 0.03,
        distanceSpeed: 2,
        bouncingSpeed: 0.3,
        addCube: function(){
            const housekGeometry = new THREE.CylinderGeometry(Math.random()*2,Math.random()*2,Math.random()*2);
            const houseMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0x445566 });
            const house = new THREE.Mesh(housekGeometry, houseMaterial);
            house.position.x = Math.random() * geometryPlane.parameters.width - 8;
            house.position.z = Math.random() * geometryPlane.parameters.height - 8;
            house.castShadow = true;
            house.receiveShadow = true;
            scene.add(house);
            renderer.render(scene, camera);
        }
    }
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0,0.5);
    gui.add(controls, 'distanceSpeed', 0,8);
    gui.add(controls, 'bouncingSpeed', 0,4);
    gui.add(controls, 'addCube', 0,4);
    renderScene( scene,renderer,camera,plane,controls);

    window.addEventListener('resize', function(){
        camera.aspect = this.window.innerWidth / this.window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(this.window.innerWidth, this.window.innerHeight);

    })
}

function house(scene) {

    /*const housekGeometry = new THREE.CylinderGeometry(2.2,2.2,5);
    const houseMaterial = new THREE.MeshLambertMaterial({ color: 0x445566 });
    const house = new THREE.Mesh(housekGeometry, houseMaterial);
    house.position.y = 0.5;
    house.position.x = 1;
    house.castShadow = true;
    house.receiveShadow = true;
    scene.add(house);*/
    
}

function light(scene) {
    const spotLight = new THREE.SpotLight(0xFFFFFF, 400,150);
    spotLight.position.set(-5, 8, 9);
    spotLight.castShadow = true;
    scene.add( spotLight );

    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    //scene.add( spotLightHelper );
}
var step = 0;

function renderScene( scene, renderer, camera,plane,controls) {
    step += controls.bouncingSpeed;
    plane.rotation.z += controls.rotationSpeed;
    requestAnimationFrame(() => renderScene(scene,renderer,camera,plane,controls));
    
    renderer.render(scene, camera);
  
    
}

init();
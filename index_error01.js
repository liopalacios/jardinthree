import * as THREE from 'three';
import { gsap } from 'gsap'
import * as dat from 'dat.gui';

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor(new THREE.Color(0x7D7C7B));

    var ambientLight = new THREE.AmbientLight(0xF24D14);
    scene.add(ambientLight);


    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
    
    //house(scene);
    bar(scene);
    //tree(scene);
    //floor(scene);
    
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

    

    esfera(scene,renderer,camera,plane);
    //renderer.render(scene, camera);

    function animateColor() {
        gsap.to(plane.material.color, 2, {
            r: Math.random(),
            g: Math.random(),
            b: Math.random()
        });
        setTimeout(animateColor, 1000);
    }
    animateColor();

    var control = {
        rotationSpeed: 0.03,
        bouncingSpeed: 2
    }
    var gui = dat.GUI();
    gui.add(control, 'rotationSpeed', 0, 0.5);
    gui.add(control, 'bouncingSpeed', 0, 4);

    
}
window.addEventListener('resize', function () {
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
})
function house(scene) {
    // CASA
    const housekGeometry = new THREE.CylinderGeometry(2.2,2.2,5);
    const houseMaterial = new THREE.MeshLambertMaterial({ color: 0x445566 });
    const house = new THREE.Mesh(housekGeometry, houseMaterial);
    house.position.y = 0.5;
    house.position.x = 1;
    house.castShadow = true;
    house.receiveShadow = true;
    scene.add(house)

    //TECHO
    const conoGeometry = new THREE.ConeGeometry(2.4,3,12);
    const conoMaterial = new THREE.MeshLambertMaterial({ color: 0x2202020 });
    const techo = new THREE.Mesh(conoGeometry, conoMaterial)
    techo.position.y = 4.5;
    techo.position.x = 1;
    //techo.position.z = 5;
    techo.castShadow = true;
    techo.receiveShadow = true;
    scene.add(techo)
}
function bar(scene) {
    //lados
    const barMaterial = new THREE.MeshLambertMaterial({ color: 0x77ff55, wireframe: false });

    const geometryBarRight = new THREE.BoxGeometry(0.2,1,8.9);
    // cubo
    const cuboright = new THREE.Mesh(geometryBarRight, barMaterial);
    cuboright.position.x = 5.7;
    cuboright.position.y = -0.5;
    cuboright.castShadow = true;
    cuboright.receiveShadow = true;
    scene.add(cuboright);
    const cuboleft = new THREE.Mesh(geometryBarRight, barMaterial);
    cuboleft.position.x = -5.7;
    cuboleft.position.y = -0.5;
    cuboleft.castShadow = true;
    cuboleft.receiveShadow = true;
    scene.add(cuboleft);

    const geometryBarBottom = new THREE.BoxGeometry(12, 1, 0.2);
    const barbottom = new THREE.Mesh(geometryBarBottom, barMaterial);
    barbottom.position.x = 0;
    barbottom.position.y = -0.5;
    barbottom.position.z = -4.2;
    barbottom.castShadow = true;
    barbottom.receiveShadow = true;
    scene.add(barbottom);
    const bartop = new THREE.Mesh(geometryBarBottom, barMaterial);
    bartop.position.x = 0;
    bartop.position.y = -0.5;
    bartop.position.z = 4.2;
    bartop.castShadow = true;
    bartop.receiveShadow = true;
    scene.add(bartop);
}
function floor(scene) {
    // <!--GEOMETRIA PLANO-->
    const geometryPlane = new THREE.PlaneGeometry( 18,28);
    const materialPlane = new THREE.MeshLambertMaterial( { color: 0x004488, wireframe: false } );
    var plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);
}
function esfera(scene,renderer,camera,plane) {
    // <!--GEOMETRIA PLANO-->
    const geometrySphere = new THREE.SphereGeometry( 2,35,35);
    const materialPlane = new THREE.MeshLambertMaterial( { color: 0x774488, wireframe: false } );
    var sphere = new THREE.Mesh(geometrySphere, materialPlane);
    sphere.position.y = 1;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);
    renderScene(sphere, scene,renderer,camera,plane);
}
function tree(scene) {
    // ARBOL
    const trunkGeometry = new THREE.BoxGeometry(0.5, 6, 0.5);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x331122, wireframe: false });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5;
    trunk.position.x = -3;
    trunk.castShadow = true;
    scene.add(trunk)

    //COPA
    const fodderGeometry = new THREE.SphereGeometry(2, 5, 8);
    const fodderMaterial = new THREE.MeshLambertMaterial({ color: 0x00AA00, wireframe: false });
    const fodder = new THREE.Mesh(fodderGeometry, fodderMaterial)
    fodder.position.y = 4;
    fodder.position.x = -3;
    fodder.castShadow = true;
    scene.add(fodder)
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
var scale = 0;

function renderScene(sphere, scene, renderer, camera,plane) {
    step += 0.02;
    scale += 0.001;
    sphere.position.x = 11 * Math.sin(step);
    sphere.position.y = Math.abs(5 * Math.sin(step));
    plane.rotation.z += 0.01;
    if (scale < 1) {
        plane.scale.set(scale,scale,scale);
    }

    

    //var s = Math.abs(Math.sin(new Date().getTime()));
    //plane.material.color.setRGB(s, Math.random(), Math.random());


    requestAnimationFrame(() => renderScene(sphere,scene,renderer,camera,plane));
    renderer.render(scene, camera);
  
    
}
/* function animate() {
	requestAnimationFrame( animate );

	cuboright.rotation.x += 0.01;
	cuboright.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate(); */
init();
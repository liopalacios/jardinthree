import * as THREE from 'three';
import * as dat from 'dat.gui';

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
    
    //house(scene);
    
    const geometryPlane = new THREE.PlaneGeometry( 16,16);
    const materialPlane = new THREE.MeshLambertMaterial( { color: 0x004488, wireframe: false } );
    var plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    plane.name = "mesaquemasaplauda";
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
        numberGeo: scene.children.length,
        addGeo: function(){
            if(Math.random()> .5){
                addCube(scene,camera,renderer,geometryPlane)
            }else{
                addSphera(scene,camera,renderer,geometryPlane)
            }
            this.numberGeo = scene.children.length
        },
        removeGeo: function () {
            var lastGeo = scene.children[scene.children.length - 1]
            if(lastGeo.name == "cubecircle")
                scene.remove(lastGeo)
                this.numberGeo = scene.children.length

        }
    }
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0,0.5);
    gui.add(controls, 'distanceSpeed', 0,8);
    gui.add(controls, 'bouncingSpeed', 0, 4);
    gui.add(controls, 'numberGeo').listen();
    gui.add(controls, 'addGeo');
    gui.add(controls, 'removeGeo');

    renderScene( scene,renderer,camera,plane,controls);

    window.addEventListener('resize', function(){
        camera.aspect = this.window.innerWidth / this.window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(this.window.innerWidth, this.window.innerHeight);

    })
}
function addSphera(scene, camera, renderer, geometryPlane) {
    console.log("esphera");
    const geometrySphere = new THREE.SphereGeometry( 2,10,20);
    const materialPlane = new THREE.MeshLambertMaterial( { color: Math.random() * 0x774488 } );
    var sphere = new THREE.Mesh(geometrySphere, materialPlane);
    sphere.position.x = Math.random() * geometryPlane.parameters.width - 4;
    sphere.position.z = Math.random() * geometryPlane.parameters.height - 4;
    sphere.rotation.x = Math.PI * .5;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.name = "cubecircle";
    scene.add(sphere);
    renderer.render(scene, camera);
}
function addCube(scene, camera, renderer, geometryPlane) {
    console.log("cubo");
    const housekGeometry = new THREE.CylinderGeometry(Math.random()*2,Math.random()*2,Math.random()*2);
    const houseMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0x445566 });
    const house = new THREE.Mesh(housekGeometry, houseMaterial);
    house.position.x = Math.random() * geometryPlane.parameters.width - 8;
    house.position.z = Math.random() * geometryPlane.parameters.height - 8;
    house.rotation.x = Math.PI * .5;
    house.castShadow = true;
    house.receiveShadow = true;
    house.name = "cubecircle";
    scene.add(house);
    renderer.render(scene, camera);
}

function renderScene( scene, renderer, camera,plane,controls) {
    

    scene.traverse(function(e){
        
        if(e instanceof THREE.Mesh && e != plane){
            e.rotation.x += controls.rotationSpeed;
            e.rotation.y += controls.rotationSpeed;
            e.rotation.z += controls.rotationSpeed;
        }
        
    })
    requestAnimationFrame(() => renderScene(scene,renderer,camera,plane,controls));    
    renderer.render(scene, camera);    
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
init();
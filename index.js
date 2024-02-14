import * as THREE from 'three';


function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    house(scene);
    bar(scene);
    tree(scene);
    floor(scene);

    camera.position.z = 10;
    camera.position.y = 4;
    camera.position.x = -3;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
function house(scene) {
    // CASA
    const housekGeometry = new THREE.CylinderGeometry(2.2,2.2,5);
    const houseMaterial = new THREE.MeshBasicMaterial({ color: 0x331122, wireframe: false });
    const house = new THREE.Mesh(housekGeometry, houseMaterial);
    house.position.y = 0.5;
    house.position.x = 1;
    scene.add(house)

    //TECHO
    const conoGeometry = new THREE.ConeGeometry(2.4,3,12);
    const conoMaterial = new THREE.MeshBasicMaterial({ color: 0x2202020, wireframe: false });
    const techo = new THREE.Mesh(conoGeometry, conoMaterial)
    techo.position.y = 4.5;
    techo.position.x = 1;
    //techo.position.z = 5;
    scene.add(techo)
}
function bar(scene) {
    //lados
    const barMaterial = new THREE.MeshBasicMaterial({ color: 0x77ff55, wireframe: false });

    const geometryBarRight = new THREE.BoxGeometry(0.2,1,8.9);
    // cubo
    const cuboright = new THREE.Mesh(geometryBarRight, barMaterial);
    cuboright.position.x = 5.7;
    cuboright.position.y = -0.5 ;
    scene.add(cuboright);
    const cuboleft = new THREE.Mesh(geometryBarRight, barMaterial);
    cuboleft.position.x = -5.7;
    cuboleft.position.y = -0.5 ;
    scene.add(cuboleft);

    const geometryBarBottom = new THREE.BoxGeometry(12, 1, 0.2);
    const barbottom = new THREE.Mesh(geometryBarBottom, barMaterial);
    barbottom.position.x = 0;
    barbottom.position.y = -0.5;
    barbottom.position.z = -4.2 ;
    scene.add(barbottom);
    const bartop = new THREE.Mesh(geometryBarBottom, barMaterial);
    bartop.position.x = 0;
    bartop.position.y = -0.5;
    bartop.position.z = 4.2 ;
    scene.add(bartop);
}
function floor(scene) {
    // <!--GEOMETRIA PLANO-->
    const geometryPlane = new THREE.PlaneGeometry( 12,9);
    const materialPlane = new THREE.MeshBasicMaterial( { color: 0x004488, wireframe: false } );
    var plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    scene.add(plane);
}
function tree(scene) {
    // ARBOL
    const trunkGeometry = new THREE.BoxGeometry(0.5, 6, 0.5);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x331122, wireframe: false });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5;
    trunk.position.x = -3;
    scene.add(trunk)

    //COPA
    const fodderGeometry = new THREE.SphereGeometry(2, 5, 8);
    const fodderMaterial = new THREE.MeshBasicMaterial({ color: 0x00AA00, wireframe: false });
    const fodder = new THREE.Mesh(fodderGeometry, fodderMaterial)
    fodder.position.y = 4;
    fodder.position.x = -3;
    scene.add(fodder)
}
/* function animate() {
	requestAnimationFrame( animate );

	cuboright.rotation.x += 0.01;
	cuboright.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate(); */
init();
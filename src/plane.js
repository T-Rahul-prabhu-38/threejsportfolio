import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap'

const rayCaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

console.log(scene);
console.log(camera)
console.log(renderer)

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

/**************************************  creating orbiral controls    **************************************/

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
//controls.enabled=false;

/**************************************  working on mesh    **************************************/
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planematerial = new THREE.MeshPhongMaterial(
    {
        side: THREE.DoubleSide,
        flatShading: true,
        vertexColors: true
    });

const planemesh = new THREE.Mesh(planeGeometry, planematerial);
scene.add(planemesh);

/**************************************  array to constantly update z axis    **************************************/
const { array } = planemesh.geometry.attributes.position;

for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
}
/**************************************  setting colour for each vertices  **************************************/

const colors= [];
for (let i = 0; i <  planemesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4);    
}
 
planemesh.geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors),3));
console.log(planemesh.geometry.attributes);
console.log(planemesh.geometry.attributes.colors);
/**************************************  setting up the light  and camera  **************************************/

const light = new THREE.DirectionalLight(0xffffff, 3);
const lightBack = new THREE.DirectionalLight(0xffffff, 3);

light.position.set(0, 0, 1);
lightBack.position.set(0, 0, -11);

scene.add(light);
scene.add(lightBack);

camera.position.z = 15;
// camera.position.y= -8;
// camera.position.x= 1;


/**************************************  rendering begins here **************************************/

renderer.render(scene, camera);

const mouse = {
    x: undefined,
    y: undefined
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // controls.update();
    rayCaster.setFromCamera(mouse,camera);
    const intersects = rayCaster.intersectObject(planemesh);
    if(intersects.length>0){
        intersects[0].object.geometry.attributes.color.needsUpdate = true;
        const { color } = intersects[0].object.geometry.attributes

    // vertice 1
    color.setX(intersects[0].face.a, 0.1)
    color.setY(intersects[0].face.a, 0.5)
    color.setZ(intersects[0].face.a, 1)

    // vertice 2
    color.setX(intersects[0].face.b, 0.1)
    color.setY(intersects[0].face.b, 0.5)
    color.setZ(intersects[0].face.b, 1)

    // vertice 3
    color.setX(intersects[0].face.c, 0.1)
    color.setY(intersects[0].face.c, 0.5)
    color.setZ(intersects[0].face.c, 1)
    }
}
animate();

/**************************************  understandig mouse co-ordinates **************************************/


addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerWidth) * 2 + 1;
});
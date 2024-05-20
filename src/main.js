import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();

console.log(scene);
console.log(camera)
console.log(renderer)

renderer.setSize(innerWidth,innerHeight);  //this creates the canvas length.
renderer.setPixelRatio(devicePixelRatio);  //this create the smoothness we need in the movement.
document.body.appendChild(renderer.domElement);//renders into the body


/*
side:THREE.DoubleSide - this is to make sure we see both sides of the object.
*/

//plane
const planeGeometry = new THREE.PlaneGeometry(5,5,10,10);   //geometry of box
const planematerial = new THREE.MeshPhongMaterial(
    {   color:0xff0000, 
        side:THREE.DoubleSide,
        flatShading:THREE.flatShading
    });   //material required for plane  /*
    
const planemesh = new THREE.Mesh(planeGeometry,planematerial); //mesh needs 2 things : geometry and material

//bideriectional light:
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(0,0,1);

//box
const boxGeometry = new THREE.BoxGeometry(1,1,1);   //geometry of box
const material = new THREE.MeshBasicMaterial({color:0x0000ff});   //material required
const mesh = new THREE.Mesh(boxGeometry,material); //mesh needs 2 things : geometry and material


//camera position set
camera.position.z=10;


//adding mesh to the scene.
scene.add(mesh);
scene.add(planemesh);
scene.add(light);

renderer.render(scene,camera);


//recursion loop to keep updating the movement
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    mesh.rotation.x+=0.05;
    mesh.rotation.y+=0.05;
    planemesh.rotation.x+=0.05;
    planemesh.rotation.y+=0.05;
}
animate();


const {array} = planemesh.geometry.attributes.position;
console.log(array);
for (let i = 0; i < array.length; i+=3) {
    const x = array[i];
    const y = array[i+1];
    const z = array[i+2];

    array[i+2]=z + Math.random();
}
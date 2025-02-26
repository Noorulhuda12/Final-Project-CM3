import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// Handle Start Button Click
document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none"; // Hide start button
    document.body.requestPointerLock(); // Lock pointer for FPS controls
});

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// First-person controls
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => controls.lock());

const moveSpeed = 0.1;
const keys = {};

// Handle keyboard input
document.addEventListener('keydown', (e) => (keys[e.code] = true));
document.addEventListener('keyup', (e) => (keys[e.code] = false));

// Add a floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Set camera height
camera.position.set(0, 1.5, 5);

/////////////////////////////////////////////////////
// 🔹 Step 7: Add the Maze Walls Here 🔹
/////////////////////////////////////////////////////
const mazeLayout = [
    "111111",
    "100001",
    "101101",
    "100001",
    "111111"
];

const wallSize = 2;
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const wallMeshes = [];

mazeLayout.forEach((row, z) => {
    row.split("").forEach((cell, x) => {
        if (cell === "1") {
            const wall = new THREE.Mesh(new THREE.BoxGeometry(wallSize, wallSize, wallSize), wallMaterial);
            wall.position.set(x * wallSize, wallSize / 2, -z * wallSize);
            scene.add(wall);
            wallMeshes.push(wall); // Store for collision detection
        }
    });
});

/////////////////////////////////////////////////////
// 🔹 Step 9: Add the Goal Here 🔹
/////////////////////////////////////////////////////
const goal = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }) // Blue cube as the goal
);
goal.position.set(4, 0.5, -4); // Adjust position to match your maze
scene.add(goal);

// Function to check if the player reached the goal
function checkWin() {
    const distance = camera.position.distanceTo(goal.position);
    if (distance < 1) {
        alert("You escaped the maze! 🎉");
        location.reload(); // Restart game
    }
}

/////////////////////////////////////////////////////
// 🔹 Step 10: Modify Animate Function to Check for Win 🔹
/////////////////////////////////////////////////////
function updatePlayerMovement() {
    if (keys['KeyW']) controls.moveForward(moveSpeed);
    if (keys['KeyS']) controls.moveForward(-moveSpeed);
    if (keys['KeyA']) controls.moveRight(-moveSpeed);
    if (keys['KeyD']) controls.moveRight(moveSpeed);
}

// Animation loop
function animate() {
    if (document.pointerLockElement !== document.body) {
        document.body.classList.add("paused"); // Blur effect when paused
        return requestAnimationFrame(animate); // Keep checking
    } else {
        document.body.classList.remove("paused");
    }

    requestAnimationFrame(animate);
    updatePlayerMovement();
    renderer.render(scene, camera);
}


animate();

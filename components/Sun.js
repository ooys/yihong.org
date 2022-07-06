import React, { useEffect } from "react";
import * as THREE from "three";

function Sun() {
    useEffect(() => {
        // Rendering Canvas
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#sun_canvas"),
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Camera Settings
        const camX = -1.2;
        const camY = 0;
        const camZ = 2;
        camera.position.set(camX, camY, camZ);

        renderer.render(scene, camera);

        // Object Settings
        const sunGeometry = new THREE.SphereBufferGeometry(1, 100, 100);
        const sunTexture = new THREE.TextureLoader().load("/images/sun.jpeg");
        const sunMaterial = new THREE.MeshBasicMaterial({
            map: sunTexture,
            wireframe: false,
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0);
        scene.add(ambientLight);

        function animate() {
            requestAnimationFrame(animate);

            // Update Camera Screen Ratio
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Update Object
            sun.rotation.x += -0.0001;
            sun.rotation.y += 0.002;

            // Update Camera
            // camera.position.z += 0.002;

            // Rerender
            renderer.render(scene, camera);
        }
        animate();
    });
    return <canvas id="sun_canvas"></canvas>;
}
export default Sun;

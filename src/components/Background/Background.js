import React from "react";
import * as THREE from "three";
import gsap from "gsap";
import moon from "../../assets/img/moon.jpg";
import NeonSign from "../NeonSign/NeonSign";
import Navbar from "../Navbar/Navbar";

export default function Background() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  window.onload = () => {
    document.getElementById("background").appendChild(renderer.domElement);
  };

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vertexUV;
        varying vec3 vertexNormal;
  
        void main(){
          vertexUV = uv;
          vertexNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
      fragmentShader: `
        uniform sampler2D globeTexture;
        varying vec2 vertexUV;
        varying vec3 vertexNormal;
  
        void main(){
          float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
          vec3 atmosphere = vec3(0.99, 0.96, 0.92) * pow(intensity, 1.5);
          gl_FragColor = vec4(atmosphere + texture2D(globeTexture,vertexUV).xyz, 1.0);
        }`,
      uniforms: {
        globeTexture: {
          value: new THREE.TextureLoader().load(moon),
        },
      },
    })
  );

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vertexNormal;
  
        void main(){
          vertexNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
      fragmentShader: `
        varying vec3 vertexNormal;
  
        void main(){
          float intensity = pow(0.55 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.99, 0.96, 0.91, 1.0) * intensity;
        }`,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  );

  atmosphere.scale.set(1.2, 1.2, 1.2);
  scene.add(atmosphere);

  const group = new THREE.Group();
  group.add(sphere);

  scene.add(group);

  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

  const starVertices = [];
  for (let i = 0; i < 3000; i++) {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    const z = -Math.random() * 100;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  camera.position.z = 25;

  var clock = new THREE.Clock();
  var time = 0;
  var delta = 0;

  const mouse = {
    x: undefined,
    y: undefined,
  };

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.002;
    delta = clock.getDelta();
    time += delta;
    atmosphere.position.y = Math.cos(time) * 0.5;
    sphere.position.y = Math.cos(time) * 0.5;
    gsap.to(group.rotation, {
      y: mouse.x * 0.5,
      x: -mouse.y * 0.2,
      duration: 2,
    });

    gsap.to(stars.rotation, {
      y: mouse.x * 0.1,
      x: -mouse.y * 0.025,
      duration: 2,
    });
  }

  animate();

  document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
  });

  return (
    <>
      <div id="background">
        <div className="content">
          <Navbar></Navbar>
          <NeonSign></NeonSign>
        </div>
      </div>
    </>
  );
}

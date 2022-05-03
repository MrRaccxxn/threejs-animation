import React from "react";
import * as THREE from "three";
import gsap from "gsap";
import moon from "../../assets/img/moon.jpg";
import Navbar from "../Navbar/Navbar";
import ContactVideo from "../../assets/video/contact.mp4";
import Message from "../../assets/img/message.png";
import BackgroundVideo from "../BackgroundVideo/BackgroundVideo";

export default function Banner() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

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

  atmosphere.scale.set(2.5, 2.5, 2.5);
  atmosphere.renderOrder = 2;
  scene.add(atmosphere);

  const group = new THREE.Group();
  group.add(sphere);
  group.renderOrder = 3;
  group.scale.set(2, 2, 2);
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
  stars.renderOrder = 1;
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
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = (event.clientY / height) * 2 + 1;
  });

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener("resize", onResize);

  window.onload = () => {
    document.getElementById("background").appendChild(renderer.domElement);
  };

  //message

  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(1, 1, 100);
  scene.add(light);

  var loader = new THREE.TextureLoader();

  var materialMessage = new THREE.MeshLambertMaterial({
    map: loader.load(Message),
  });

  var geometryMessage = new THREE.PlaneGeometry(10, 10 * 0.75);

  var meshMessage = new THREE.Mesh(geometryMessage, materialMessage);

  meshMessage.position.set(-12, -6, 12);
  meshMessage.scale.set(0.6, 0.6, 0.6);
  scene.add(meshMessage);

  document.addEventListener("mousedown", (event) => {
    meshMessage.position.set(
      Math.floor(Math.random() * (17 - -17 + 1)) + -17,
      Math.floor(Math.random() * (10 - -10 + 1)) + -10,
      6
    );
    meshMessage.position.z = +12;
    scene.add(meshMessage);
  });

  return (
    <>
      <div id="backText">
        <p className="textShadows textGenerator"><span className="firstWord">HELLO</span> </p>
      </div>

      <div id="background">
        <div className="content">
          <BackgroundVideo></BackgroundVideo>
          <Navbar></Navbar>
        </div>
      </div>

      <div className="scrollLine"></div>

      <p className="scrollText">Scroll or die</p>
    </>
  );
}

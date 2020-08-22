import React, {createRef, useEffect} from 'react';
import { inject } from 'mobx-react';
import * as THREE from 'three';
import { render } from '@testing-library/react';

var camera, scene, renderer, sunLight;
var geometry, material, mesh;
const size = 800;
const dr = 4;

const Terrain3d = inject("yourStore")((props) => {
  var {x, y, isResetData} = props.yourStore.useTerrainData();
  var {reset} = props.yourStore;

  let canvas;
  let canvasRef = createRef();

  useEffect(() => {
    init();
    // animate();
  }, []);

  if (isResetData){
    reset(false);
    for (var i = 0; i < mesh.geometry.vertices.length; i++){
      mesh.geometry.vertices[i].z = Math.random()*5;
    }
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    renderer.render( scene, camera );
  } else {
    if (mesh) {
      for (var i = -3; i <= 3; i ++){
        for (var j = -3; j <= 3; j ++){
          var nY = Math.floor(y / dr) + i;
          var nX = Math.floor(x / dr) + j;
          if (nY >= 0 && nY < 100 && nX >= 0 && nX < 100)
            mesh.geometry.vertices[nY * 100 + nX].z += 2; 
        }
      }
      mesh.geometry.verticesNeedUpdate = true;
      mesh.geometry.computeVertexNormals();
      renderer.render( scene, camera );
    }
  }

 
  return (
    <>
      <div>
      </div>
    </>
  )
})

function init() {

  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera( 90, 1, 0.1, 1000 );
  camera.position.z = 300;
  camera.position.x = 0;
  camera.position.y = 400;
  camera.lookAt(new THREE.Vector3(0,0,0));

  sunLight = new THREE.DirectionalLight(0xfffff, 1);
  sunLight.position.set(-300, 100, -400);
  sunLight.position.multiplyScalar(5.0);
  sunLight.castShadow = false;
  sunLight.shadow.mapSize.width = 512;
  sunLight.shadow.mapSize.height = 512;
  sunLight.lookAt( new THREE.Vector3(0,0,0) );
  scene.add( sunLight );

  geometry = new THREE.PlaneGeometry(500, 500, 99, 99);
  geometry.verticesNeedUpdate = true;
  material = new THREE.MeshPhongMaterial( {
    color: 0xccff00,
    shininess: 0.0,
    // specular: 0xefefef,
    shading: THREE.SmoothShading,
    // emissive: 0x2323ef
  });

  mesh = new THREE.Mesh( geometry, material );
  mesh.rotation.x = -Math.PI/2;
  mesh.position.y = -1;
  //mesh.castShadow = true;

  mesh.geometry = new THREE.PlaneGeometry(500, 500, 99, 99);
  for (var i = 0, l = mesh.geometry.vertices.length; i < l; i++) {
    mesh.geometry.vertices[i].z = Math.random() * 5;
  }

  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.computeVertexNormals();

  scene.add(mesh);

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha : true } );
  renderer.setSize(size, size);
  renderer.setClearColor( 0x00ffffff, 0);
  renderer.render(scene, camera);

  var p = document.createElement('div');
  p.appendChild(renderer.domElement);
  p.style.marginLeft = '50%';
  p.style.transform = 'translate(-400px)';//, background : 'red'};
  p.style.width = '800px';
  p.style.height = '800px';
  p.style.backgroundColor = 'lightblue';

  document.body.appendChild(p);
}
export default Terrain3d;
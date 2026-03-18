import * as THREE from 'three';
import { LoopSubdivision } from 'three-subdivide'; // npm install three-subdivide

export function createHighPolyHumanMesh(): THREE.Group {
  const group = new THREE.Group();

  // Kopf
  const headGeo = new THREE.SphereGeometry(0.12, 128, 128);
  const headSubdivided = LoopSubdivision.modify(headGeo, 2);
  const headMesh = new THREE.Mesh(headSubdivided);
  group.add(headMesh);

  // Torso
  const torsoGeo = new THREE.CylinderGeometry(0.2, 0.18, 0.6, 64, 128);
  const torsoSubdivided = LoopSubdivision.modify(torsoGeo, 2);
  const torsoMesh = new THREE.Mesh(torsoSubdivided);
  group.add(torsoMesh);

  // Arme
  const armGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.3, 32, 64);
  const armSubdivided = LoopSubdivision.modify(armGeo, 2);
  const leftArmMesh = new THREE.Mesh(armSubdivided);
  leftArmMesh.position.set(-0.18, 0.2, 0);
  group.add(leftArmMesh);
  const rightArmMesh = new THREE.Mesh(armSubdivided);
  rightArmMesh.position.set(0.18, 0.2, 0);
  group.add(rightArmMesh);

  // Beine
  const legGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.5, 32, 64);
  const legSubdivided = LoopSubdivision.modify(legGeo, 2);
  const leftLegMesh = new THREE.Mesh(legSubdivided);
  leftLegMesh.position.set(-0.08, -0.5, 0);
  group.add(leftLegMesh);
  const rightLegMesh = new THREE.Mesh(legSubdivided);
  rightLegMesh.position.set(0.08, -0.5, 0);
  group.add(rightLegMesh);

  // Hände
  const handGeo = new THREE.SphereGeometry(0.05, 32, 32);
  const handSubdivided = LoopSubdivision.modify(handGeo, 2);
  const leftHandMesh = new THREE.Mesh(handSubdivided);
  leftHandMesh.position.set(-0.18, 0.35, 0);
  group.add(leftHandMesh);
  const rightHandMesh = new THREE.Mesh(handSubdivided);
  rightHandMesh.position.set(0.18, 0.35, 0);
  group.add(rightHandMesh);

  // Füße
  const footGeo = new THREE.SphereGeometry(0.06, 32, 32);
  const footSubdivided = LoopSubdivision.modify(footGeo, 2);
  const leftFootMesh = new THREE.Mesh(footSubdivided);
  leftFootMesh.position.set(-0.08, -0.75, 0);
  group.add(leftFootMesh);
  const rightFootMesh = new THREE.Mesh(footSubdivided);
  rightFootMesh.position.set(0.08, -0.75, 0);
  group.add(rightFootMesh);

  // Polygon-Count verifizieren
  let totalPoly = 0;
  group.traverse(obj => {
    if (obj.isMesh && obj.geometry && obj.geometry.index) {
      totalPoly += obj.geometry.index.count / 3;
    }
  });

  if (totalPoly < 200000) {
    throw new Error(`INSUFFICIENT POLYGONS: ${totalPoly} < 200000`);
  }

  console.log(`✅ ProceduralHumanMesh: ${totalPoly} Polygone`);
  return group;
}

import { MeshPhysicalMaterial, TextureLoader, Vector2 } from 'three';

export function createNPCMaterial(npcType: string): MeshPhysicalMaterial {
  // Farbwahl nach Typ
  const colorMap: Record<string, number> = {
    POLICE: 0x4488ff,
    RIOT_POLICE: 0x2222aa,
    SEK: 0x333333,
    DEMONSTRATOR: 0xffcc00,
    ORGANIZER: 0xff8800,
    KRAUSE: 0x8800ff,
    EXTREMIST: 0xff0000,
    RIOTER: 0xaa0000,
    CIVILIAN: 0xcccccc,
    TOURIST: 0x00cc99,
    JOURNALIST: 0x00aaff,
    MUSICIAN: 0x00ff00,
    MEDIC: 0xffffff,
    FIREFIGHTER: 0xff6600,
    PRESS: 0x222222,
    GOVERNMENT_AGENT: 0x222222,
  };

  return new MeshPhysicalMaterial({
    color: colorMap[npcType] || 0xcccccc,
    roughness: 0.6,
    metalness: 0.0,
    transmission: 0.1,
    normalScale: new Vector2(1, 1),
    envMapIntensity: 1.0,
    side: 1,
    toneMapped: true,
  });
}

// BEWEIS: console.log(material.isMeshPhysicalMaterial) → true
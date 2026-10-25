import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import {
  renderEditorialCanvas,
  PlateTheme,
} from '../utils/editorialPlateGenerator';
import { EditorialImage } from './EditorialImage';

export type CameraViewPreset = 'overview' | 'optics' | 'frames';

export interface FloatingFrameMeta {
  id: string;
  title: string;
  category: string;
  exif: string;
  theme: PlateTheme;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
}

export const HERO_GALLERY_FRAMES: FloatingFrameMeta[] = [
  {
    id: 'frame-hero-1',
    title: 'Kidung Asmara Beludru Maroon',
    category: 'Wedding Editorial',
    exif: '85mm · f/1.4 · ISO 160',
    theme: 'kebaya-wedding',
    pos: [-2.65, 0.58, -0.55],
    rot: [0.03, 0.42, -0.02],
    scale: 1.08,
  },
  {
    id: 'frame-hero-2',
    title: 'Kabut Pagi Kaldera Tengger',
    category: 'Prewedding Heritage',
    exif: '35mm · f/2.0 · ISO 100',
    theme: 'bromo-prewedding',
    pos: [2.75, 0.52, -0.65],
    rot: [0.02, -0.44, 0.02],
    scale: 1.08,
  },
  {
    id: 'frame-hero-3',
    title: 'Elegansi Ketenangan Sanggul Jawa',
    category: 'Fine Art Portrait',
    exif: '90mm · f/2.0 · ISO 100',
    theme: 'velvet-portrait',
    pos: [-3.95, -0.68, -2.1],
    rot: [-0.03, 0.32, 0.02],
    scale: 0.96,
  },
  {
    id: 'frame-hero-4',
    title: 'Sulaman Emas & Motif Kawung',
    category: 'Culture & Heritage',
    exif: '100mm Macro · f/4.0 · ISO 100',
    theme: 'batik-macro',
    pos: [4.0, -0.65, -2.05],
    rot: [-0.02, -0.34, -0.02],
    scale: 0.96,
  },
  {
    id: 'frame-hero-5',
    title: 'Pusaka Visual Tiga Generasi',
    category: 'Family Portrait',
    exif: '50mm · f/2.8 · ISO 200',
    theme: 'heritage-family',
    pos: [-1.85, 1.75, -3.2],
    rot: [0.08, 0.22, -0.02],
    scale: 0.86,
  },
  {
    id: 'frame-hero-6',
    title: 'Malam Apresiasi Budaya Malang',
    category: 'Cultural Stage',
    exif: '70-200mm · f/2.8 · ISO 400',
    theme: 'cultural-stage',
    pos: [1.95, 1.72, -3.25],
    rot: [0.08, -0.22, 0.02],
    scale: 0.86,
  },
  {
    id: 'frame-hero-7',
    title: 'Kriya Perhiasan & Wastra',
    category: 'Commercial Still-Life',
    exif: '90mm · f/8.0 · ISO 64',
    theme: 'artisan-product',
    pos: [-3.2, 1.45, -4.6],
    rot: [0.05, 0.28, 0],
    scale: 0.78,
  },
  {
    id: 'frame-hero-8',
    title: 'Langkah Baru Balutan Tradisi',
    category: 'Graduation Editorial',
    exif: '85mm · f/1.8 · ISO 125',
    theme: 'graduation-editorial',
    pos: [3.25, 1.4, -4.65],
    rot: [0.05, -0.28, 0],
    scale: 0.78,
  },
];

interface Hero3DSceneProps {
  cameraPreset: CameraViewPreset;
  explodedFactor: number;
  apertureOpen: number;
  focusedFrameId: string | null;
  onSelectFrame: (frame: FloatingFrameMeta | null) => void;
  onHoverFrame: (frame: FloatingFrameMeta | null) => void;
}

// Pre-allocated math helpers at module scope (Zero GC in render loop)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 0.08, 0);
const _pointerVec2 = new THREE.Vector2();
const _spotTargetPos = new THREE.Vector3();

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({
  cameraPreset,
  explodedFactor,
  apertureOpen,
  focusedFrameId,
  onSelectFrame,
  onHoverFrame,
}) => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const callbacksRef = useRef({ onSelectFrame, onHoverFrame });
  useEffect(() => {
    callbacksRef.current = { onSelectFrame, onHoverFrame };
  }, [onSelectFrame, onHoverFrame]);

  // Store mutable props in refs so React UI updates never tear down the WebGL canvas
  const stateRef = useRef({
    cameraPreset,
    explodedFactor,
    apertureOpen,
    focusedFrameId,
    pointerX: 0,
    pointerY: 0,
    hoveredFrameId: null as string | null,
    scrollRatio: 0,
  });

  useEffect(() => {
    stateRef.current.cameraPreset = cameraPreset;
    stateRef.current.explodedFactor = explodedFactor;
    stateRef.current.apertureOpen = apertureOpen;
    stateRef.current.focusedFrameId = focusedFrameId;
  }, [cameraPreset, explodedFactor, apertureOpen, focusedFrameId]);

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl =
          probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const width = mountEl.clientWidth || window.innerWidth;
    const height = mountEl.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5)
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl && !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountEl.innerHTML = '';
    mountEl.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    // Scene & Atmospheric Horizon Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141115);
    scene.fog = new THREE.FogExp2(0x141115, 0.048);

    // Mandatory Studio Environment Reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 52 : 40,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0.65, isMobile ? 9.2 : 7.4);

    // =========================================================================
    // STUDIO LIGHTING RIG
    // =========================================================================
    const hemiLight = new THREE.HemisphereLight(0xf7f0e5, 0x35251f, 0.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe6c2, 2.35);
    keyLight.position.set(4.8, 6.5, 5.2);
    if (!isSoftwareGl && !isMobile) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(512, 512);
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 22;
      const d = 5.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a15a, 1.85);
    rimLight.position.set(-5.2, 3.5, -4.2);
    scene.add(rimLight);

    const maroonUnderglow = new THREE.PointLight(0x651b32, 3.8, 14);
    maroonUnderglow.position.set(0, -1.4, 2.4);
    scene.add(maroonUnderglow);

    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      const goldSoftbox = new THREE.RectAreaLight(0xffdf9e, 4.5, 3.5, 2.2);
      goldSoftbox.position.set(3.6, 2.8, 3.2);
      goldSoftbox.lookAt(0, 0, 0);
      scene.add(goldSoftbox);

      const roseSoftbox = new THREE.RectAreaLight(0xb9838c, 3.2, 3.2, 2.2);
      roseSoftbox.position.set(-3.8, 2.2, 2.8);
      roseSoftbox.lookAt(0, 0, 0);
      scene.add(roseSoftbox);
    }

    const pointerSpotLight = new THREE.SpotLight(
      0xffe8c2,
      3.4,
      18,
      Math.PI / 5,
      0.65,
      1.5
    );
    pointerSpotLight.position.set(0, 2.6, 4.5);
    scene.add(pointerSpotLight);
    scene.add(pointerSpotLight.target);

    // =========================================================================
    // PBR MATERIALS LIBRARY (Single-pass optimized for 60fps scrolling)
    // =========================================================================
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

    const charcoalBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1b181c,
      roughness: 0.52,
      metalness: 0.38,
    });

    const maroonLeatherMat = new THREE.MeshPhysicalMaterial({
      color: 0x651b32,
      roughness: 0.68,
      metalness: 0.12,
      sheen: 0.65,
      sheenColor: new THREE.Color(0xb9838c),
      sheenRoughness: 0.45,
    });

    const brushedGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xc5a15a,
      metalness: 0.94,
      roughness: 0.16,
      anisotropy: 0.85,
      clearcoat: 0.4,
    });

    const activeGoldFrameMat = new THREE.MeshPhysicalMaterial({
      color: 0xdfbd78,
      emissive: 0x651b32,
      emissiveIntensity: 0.35,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 0.6,
    });

    const darkBronzeBarrelMat = new THREE.MeshStandardMaterial({
      color: 0x261f1d,
      metalness: 0.84,
      roughness: 0.24,
    });

    const opticalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xf7f0e5,
      metalness: 0.15,
      roughness: 0.04,
      transparent: true,
      opacity: 0.46,
      ior: 1.64,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      envMapIntensity: 2.2,
      depthWrite: false,
    });

    const rubyCoatingGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xb9838c,
      metalness: 0.22,
      roughness: 0.05,
      transparent: true,
      opacity: 0.52,
      ior: 1.76,
      clearcoat: 1.0,
      envMapIntensity: 2.0,
      depthWrite: false,
    });

    const ivoryMatBoard = new THREE.MeshStandardMaterial({
      color: 0xf7f0e5,
      roughness: 0.82,
      metalness: 0.02,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });

    // =========================================================================
    // 1. COMPOSITE 10-PART 3D MEDIUM FORMAT CAMERA & LENS ASSEMBLY
    // =========================================================================
    const cameraAssembly = new THREE.Group();
    cameraAssembly.position.set(0, -0.05, 0);
    scene.add(cameraAssembly);

    const chassisGeo = new THREE.BoxGeometry(1.75, 1.28, 0.72);
    const chassisMesh = new THREE.Mesh(chassisGeo, charcoalBodyMat);
    chassisMesh.position.set(0, 0, -0.45);
    chassisMesh.castShadow = !isSoftwareGl;
    chassisMesh.receiveShadow = !isSoftwareGl;
    cameraAssembly.add(chassisMesh);

    const leatherWrapGeo = new THREE.BoxGeometry(1.62, 1.02, 0.75);
    const leatherWrapMesh = new THREE.Mesh(leatherWrapGeo, maroonLeatherMat);
    leatherWrapMesh.position.set(0, -0.04, -0.45);
    cameraAssembly.add(leatherWrapMesh);

    const gripGeo = new THREE.CylinderGeometry(0.22, 0.22, 1.22, 24);
    const gripMesh = new THREE.Mesh(gripGeo, maroonLeatherMat);
    gripMesh.position.set(-0.78, -0.02, -0.22);
    cameraAssembly.add(gripMesh);

    const prismGeo = new THREE.CylinderGeometry(0.32, 0.46, 0.36, 4);
    prismGeo.rotateY(Math.PI / 4);
    const prismMesh = new THREE.Mesh(prismGeo, charcoalBodyMat);
    prismMesh.position.set(0, 0.78, -0.45);
    cameraAssembly.add(prismMesh);

    const dialGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 24);
    const shutterDial = new THREE.Mesh(dialGeo, brushedGoldMat);
    shutterDial.position.set(-0.55, 0.69, -0.38);
    cameraAssembly.add(shutterDial);

    const isoDial = new THREE.Mesh(dialGeo, brushedGoldMat);
    isoDial.position.set(0.55, 0.69, -0.45);
    cameraAssembly.add(isoDial);

    const shutterBtnGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.08, 20);
    const shutterBtn = new THREE.Mesh(shutterBtnGeo, brushedGoldMat);
    shutterBtn.position.set(-0.75, 0.64, -0.18);
    cameraAssembly.add(shutterBtn);

    const mountRingGeo = new THREE.TorusGeometry(0.54, 0.055, 20, 48);
    const mountRingMesh = new THREE.Mesh(mountRingGeo, brushedGoldMat);
    mountRingMesh.position.set(0, 0, -0.05);
    cameraAssembly.add(mountRingMesh);

    const rearBarrelGroup = new THREE.Group();
    const apertureGroup = new THREE.Group();
    const frontElementGroup = new THREE.Group();
    const hoodGroup = new THREE.Group();
    cameraAssembly.add(
      rearBarrelGroup,
      apertureGroup,
      frontElementGroup,
      hoodGroup
    );

    const mainBarrelGeo = new THREE.CylinderGeometry(
      0.52,
      0.54,
      0.68,
      40,
      1,
      true
    );
    mainBarrelGeo.rotateX(Math.PI / 2);
    const mainBarrelMesh = new THREE.Mesh(mainBarrelGeo, darkBronzeBarrelMat);
    mainBarrelMesh.position.set(0, 0, 0.28);
    rearBarrelGroup.add(mainBarrelMesh);

    const focusRingGeo = new THREE.TorusGeometry(0.535, 0.032, 16, 48);
    const focusRingMesh = new THREE.Mesh(focusRingGeo, brushedGoldMat);
    focusRingMesh.position.set(0, 0, 0.22);
    rearBarrelGroup.add(focusRingMesh);

    const apertureRingMesh = new THREE.Mesh(focusRingGeo, brushedGoldMat);
    apertureRingMesh.position.set(0, 0, 0.46);
    rearBarrelGroup.add(apertureRingMesh);

    const bladeCount = 8;
    const irisBlades: THREE.Mesh[] = [];
    const bladeGeo = new THREE.BoxGeometry(0.32, 0.14, 0.015);
    for (let i = 0; i < bladeCount; i++) {
      const blade = new THREE.Mesh(bladeGeo, brushedGoldMat);
      const angle = (i / bladeCount) * Math.PI * 2;
      blade.userData = { baseAngle: angle };
      apertureGroup.add(blade);
      irisBlades.push(blade);
    }
    apertureGroup.position.set(0, 0, 0.48);

    const rearGlassGeo = new THREE.SphereGeometry(
      0.46,
      32,
      20,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.35
    );
    rearGlassGeo.rotateX(Math.PI / 2);
    const rearGlassMesh = new THREE.Mesh(rearGlassGeo, rubyCoatingGlassMat);
    rearGlassMesh.position.set(0, 0, 0.12);
    rearGlassMesh.renderOrder = 2;
    rearBarrelGroup.add(rearGlassMesh);

    const frontGlassGeo = new THREE.SphereGeometry(
      0.52,
      36,
      24,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.38
    );
    frontGlassGeo.rotateX(Math.PI / 2);
    const frontGlassMesh = new THREE.Mesh(frontGlassGeo, opticalGlassMat);
    frontGlassMesh.position.set(0, 0, 0.42);
    frontGlassMesh.renderOrder = 3;
    frontElementGroup.add(frontGlassMesh);

    const frontRetainerGeo = new THREE.TorusGeometry(0.51, 0.038, 20, 48);
    const frontRetainerMesh = new THREE.Mesh(
      frontRetainerGeo,
      darkBronzeBarrelMat
    );
    frontRetainerMesh.position.set(0, 0, 0.65);
    frontElementGroup.add(frontRetainerMesh);

    const hoodCylGeo = new THREE.CylinderGeometry(
      0.6,
      0.52,
      0.36,
      40,
      1,
      true
    );
    hoodCylGeo.rotateX(Math.PI / 2);
    const hoodCylMesh = new THREE.Mesh(hoodCylGeo, charcoalBodyMat);
    hoodCylMesh.position.set(0, 0, 0.84);
    hoodGroup.add(hoodCylMesh);

    const hoodGoldTrimGeo = new THREE.TorusGeometry(0.6, 0.018, 16, 48);
    const hoodGoldTrimMesh = new THREE.Mesh(hoodGoldTrimGeo, brushedGoldMat);
    hoodGoldTrimMesh.position.set(0, 0, 1.02);
    hoodGroup.add(hoodGoldTrimMesh);

    // =========================================================================
    // 2. FLOATING 3D GALLERY FRAMES WITH RAYCASTING INTERACTION
    // =========================================================================
    const galleryFramesGroup = new THREE.Group();
    scene.add(galleryFramesGroup);

    const disposableTextures: THREE.Texture[] = [];
    const disposableMaterials: THREE.Material[] = [
      charcoalBodyMat,
      maroonLeatherMat,
      brushedGoldMat,
      activeGoldFrameMat,
      darkBronzeBarrelMat,
      opticalGlassMat,
      rubyCoatingGlassMat,
      ivoryMatBoard,
    ];
    const disposableGeometries: THREE.BufferGeometry[] = [
      chassisGeo,
      leatherWrapGeo,
      gripGeo,
      prismGeo,
      dialGeo,
      shutterBtnGeo,
      mountRingGeo,
      mainBarrelGeo,
      focusRingGeo,
      bladeGeo,
      rearGlassGeo,
      frontGlassGeo,
      frontRetainerGeo,
      hoodCylGeo,
      hoodGoldTrimGeo,
    ];

    const frameOuterGeo = new THREE.BoxGeometry(1.44, 1.88, 0.065);
    const frameMaroonTrimGeo = new THREE.BoxGeometry(1.36, 1.8, 0.07);
    const frameMatGeo = new THREE.PlaneGeometry(1.26, 1.7);
    const framePhotoGeo = new THREE.PlaneGeometry(1.12, 1.54);
    disposableGeometries.push(
      frameOuterGeo,
      frameMaroonTrimGeo,
      frameMatGeo,
      framePhotoGeo
    );

    const floatingFrameMeshes: THREE.Group[] = [];
    const raycastTargets: THREE.Object3D[] = [];

    HERO_GALLERY_FRAMES.forEach((cfg, idx) => {
      if (isMobile && idx >= 4) return;

      const fGroup = new THREE.Group();
      const baseScale = cfg.scale * (isMobile ? 0.76 : 1);
      fGroup.position.set(
        cfg.pos[0] * (isMobile ? 0.66 : 1),
        cfg.pos[1],
        cfg.pos[2]
      );
      fGroup.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      fGroup.scale.setScalar(baseScale);

      const outerMesh = new THREE.Mesh(frameOuterGeo, brushedGoldMat);
      outerMesh.castShadow = !isSoftwareGl;
      outerMesh.layers.enable(1);
      outerMesh.userData = { frameMeta: cfg };
      fGroup.add(outerMesh);
      raycastTargets.push(outerMesh);

      const maroonInnerMesh = new THREE.Mesh(
        frameMaroonTrimGeo,
        maroonLeatherMat
      );
      fGroup.add(maroonInnerMesh);

      const matMesh = new THREE.Mesh(frameMatGeo, ivoryMatBoard);
      matMesh.position.z = 0.036;
      fGroup.add(matMesh);

      const texCanvas = document.createElement('canvas');
      texCanvas.width = 280;
      texCanvas.height = 374;
      renderEditorialCanvas(texCanvas, {
        id: cfg.id,
        theme: cfg.theme,
        title: cfg.title,
        aspect: 'portrait',
      });

      const canvasTex = new THREE.CanvasTexture(texCanvas);
      canvasTex.colorSpace = THREE.SRGBColorSpace;
      canvasTex.anisotropy = maxAnisotropy;
      disposableTextures.push(canvasTex);

      const photoMat = new THREE.MeshStandardMaterial({
        map: canvasTex,
        roughness: 0.36,
        metalness: 0.06,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      });
      disposableMaterials.push(photoMat);

      const photoMesh = new THREE.Mesh(framePhotoGeo, photoMat);
      photoMesh.position.z = 0.039;
      photoMesh.layers.enable(1);
      photoMesh.userData = { frameMeta: cfg };
      fGroup.add(photoMesh);
      raycastTargets.push(photoMesh);

      fGroup.userData = {
        frameMeta: cfg,
        outerMesh,
        basePos: fGroup.position.clone(),
        baseRot: fGroup.rotation.clone(),
        baseScale,
        currentHoverBoost: 0,
        phaseOffset: idx * 0.95,
      };

      galleryFramesGroup.add(fGroup);
      floatingFrameMeshes.push(fGroup);
    });

    // =========================================================================
    // 3. ARCHITECTURAL GALLERY FLOOR INLAY & GOLDEN ORBITAL RINGS
    // =========================================================================
    const orbitalRing1Geo = new THREE.TorusGeometry(2.15, 0.008, 12, 96);
    const orbitalRing2Geo = new THREE.TorusGeometry(2.75, 0.006, 12, 96);
    const orbitalRing3Geo = new THREE.TorusGeometry(3.55, 0.004, 12, 96);
    disposableGeometries.push(
      orbitalRing1Geo,
      orbitalRing2Geo,
      orbitalRing3Geo
    );

    const orbitalRing1 = new THREE.Mesh(orbitalRing1Geo, brushedGoldMat);
    orbitalRing1.rotation.set(0.35, -0.25, 0);
    scene.add(orbitalRing1);

    const orbitalRing2 = new THREE.Mesh(orbitalRing2Geo, brushedGoldMat);
    orbitalRing2.rotation.set(-0.25, 0.4, 0.2);
    scene.add(orbitalRing2);

    const orbitalRing3 = new THREE.Mesh(orbitalRing3Geo, brushedGoldMat);
    orbitalRing3.rotation.set(Math.PI / 2.2, 0, 0);
    orbitalRing3.position.y = -1.32;
    scene.add(orbitalRing3);

    const particleCount = isMobile ? 30 : 65;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1.2;
    }
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    disposableGeometries.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a15a,
      size: 0.036,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
    });
    disposableMaterials.push(particleMat);
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 256;
    floorCanvas.height = 256;
    const fCtx = floorCanvas.getContext('2d');
    if (fCtx) {
      const grad = fCtx.createRadialGradient(128, 128, 10, 128, 128, 122);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
      grad.addColorStop(0.55, 'rgba(23, 21, 24, 0.35)');
      grad.addColorStop(1, 'rgba(23, 21, 24, 0)');
      fCtx.fillStyle = grad;
      fCtx.fillRect(0, 0, 256, 256);

      fCtx.strokeStyle = 'rgba(197, 161, 90, 0.18)';
      fCtx.lineWidth = 1;
      [35, 65, 95, 118].forEach((r) => {
        fCtx.beginPath();
        fCtx.arc(128, 128, r, 0, Math.PI * 2);
        fCtx.stroke();
      });
    }
    const floorTex = new THREE.CanvasTexture(floorCanvas);
    floorTex.colorSpace = THREE.SRGBColorSpace;
    disposableTextures.push(floorTex);

    const contactShadowGeo = new THREE.PlaneGeometry(8.5, 8.5);
    disposableGeometries.push(contactShadowGeo);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: floorTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    disposableMaterials.push(contactShadowMat);
    const contactShadowMesh = new THREE.Mesh(
      contactShadowGeo,
      contactShadowMat
    );
    contactShadowMesh.rotation.x = -Math.PI / 2;
    contactShadowMesh.position.set(0, -1.35, -0.6);
    scene.add(contactShadowMesh);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // =========================================================================
    // 4. RAYCASTING & VIEWPORT VISIBILITY PAUSE FOR 60FPS SCROLLING
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    let lastRaycastTime = 0;
    let cachedWidth = width;
    let cachedHeight = height;

    const handlePointerMove = (e: PointerEvent) => {
      if (cachedWidth <= 0 || cachedHeight <= 0) return;
      const nx = (e.clientX / cachedWidth) * 2 - 1;
      const ny = -(e.clientY / cachedHeight) * 2 + 1;
      stateRef.current.pointerX = THREE.MathUtils.clamp(nx, -1, 1);
      stateRef.current.pointerY = THREE.MathUtils.clamp(ny, -1, 1);

      const now = performance.now();
      if (now - lastRaycastTime < 65) return;
      lastRaycastTime = now;

      _pointerVec2.set(stateRef.current.pointerX, stateRef.current.pointerY);
      raycaster.setFromCamera(_pointerVec2, camera);
      const hits = raycaster.intersectObjects(raycastTargets, false);

      if (hits.length > 0) {
        const meta = hits[0].object.userData.frameMeta as
          | FloatingFrameMeta
          | undefined;
        if (meta && stateRef.current.hoveredFrameId !== meta.id) {
          stateRef.current.hoveredFrameId = meta.id;
          callbacksRef.current.onHoverFrame(meta);
          renderer.domElement.style.cursor = 'pointer';
        }
      } else if (stateRef.current.hoveredFrameId !== null) {
        stateRef.current.hoveredFrameId = null;
        callbacksRef.current.onHoverFrame(null);
        renderer.domElement.style.cursor = 'default';
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _pointerVec2.set(nx, ny);
      raycaster.setFromCamera(_pointerVec2, camera);
      const hits = raycaster.intersectObjects(raycastTargets, false);

      if (hits.length > 0) {
        const meta = hits[0].object.userData.frameMeta as
          | FloatingFrameMeta
          | undefined;
        if (meta) {
          const nextFocus =
            stateRef.current.focusedFrameId === meta.id ? null : meta;
          callbacksRef.current.onSelectFrame(nextFocus);
        }
      }
    };

    let scrollTicking = false;
    const handleScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        const ratio = Math.min(1, Math.max(0, window.scrollY / cachedHeight));
        stateRef.current.scrollRatio = ratio;
      });
    };

    mountEl.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    renderer.domElement.addEventListener('click', handleCanvasClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!mountEl) return;
      cachedWidth = mountEl.clientWidth || window.innerWidth;
      cachedHeight = mountEl.clientHeight || window.innerHeight;
      camera.aspect = cachedWidth / cachedHeight;
      camera.fov = cachedWidth < 768 ? 52 : 40;
      camera.updateProjectionMatrix();
      renderer.setSize(cachedWidth, cachedHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const clock = new THREE.Clock();
    let frameId = 0;
    let isRunning = false;
    let isHeroVisible = true;
    let currentExploded = stateRef.current.explodedFactor;
    let currentAperture = stateRef.current.apertureOpen;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (!isRunning) {
            if (sync) gl.deleteSync(sync);
            return;
          }
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      if (!isRunning) return;

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const {
        cameraPreset: preset,
        explodedFactor: targetExploded,
        apertureOpen: targetAperture,
        focusedFrameId: activeFocusId,
        hoveredFrameId,
        pointerX,
        pointerY,
        scrollRatio,
      } = stateRef.current;

      const mobileNow = cachedWidth < 768;

      const focusedGroup = activeFocusId
        ? floatingFrameMeshes.find(
            (g) =>
              (g.userData.frameMeta as FloatingFrameMeta).id === activeFocusId
          )
        : undefined;

      if (focusedGroup) {
        const bp = focusedGroup.userData.basePos as THREE.Vector3;
        _targetCamPos.set(
          bp.x * 0.68 + pointerX * 0.18,
          bp.y + pointerY * 0.15,
          bp.z + (mobileNow ? 3.1 : 2.35)
        );
        _targetLookAt.set(bp.x * 0.92, bp.y, bp.z);
      } else if (preset === 'optics') {
        _targetCamPos.set(
          1.45 + pointerX * 0.28,
          0.32 + pointerY * 0.22,
          (mobileNow ? 4.2 : 3.2) - scrollRatio * 0.8
        );
        _targetLookAt.set(0, 0, 0.48);
      } else if (preset === 'frames') {
        _targetCamPos.set(
          pointerX * 0.75,
          0.45 + pointerY * 0.35,
          (mobileNow ? 8.4 : 6.9) - scrollRatio * 1.4
        );
        _targetLookAt.set(pointerX * 0.3, 0.2, -1.25);
      } else {
        _targetCamPos.set(
          pointerX * 0.55,
          0.24 + pointerY * 0.28 - scrollRatio * 0.3,
          (mobileNow ? 7.3 : 5.5) - scrollRatio * 1.35
        );
        _targetLookAt.set(pointerX * 0.2, 0.05, -scrollRatio * 0.6);
      }

      const dampLambda = 4.0;
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        _targetCamPos.x,
        dampLambda,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        _targetCamPos.y,
        dampLambda,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        _targetCamPos.z,
        dampLambda,
        delta
      );

      _currentLookAt.x = THREE.MathUtils.damp(
        _currentLookAt.x,
        _targetLookAt.x,
        dampLambda,
        delta
      );
      _currentLookAt.y = THREE.MathUtils.damp(
        _currentLookAt.y,
        _targetLookAt.y,
        dampLambda,
        delta
      );
      _currentLookAt.z = THREE.MathUtils.damp(
        _currentLookAt.z,
        _targetLookAt.z,
        dampLambda,
        delta
      );
      camera.lookAt(_currentLookAt);

      _spotTargetPos.set(pointerX * 3.8, pointerY * 2.4, -0.8);
      pointerSpotLight.target.position.lerp(_spotTargetPos, 0.12);

      currentExploded = THREE.MathUtils.damp(
        currentExploded,
        targetExploded,
        5.5,
        delta
      );
      currentAperture = THREE.MathUtils.damp(
        currentAperture,
        targetAperture,
        6.0,
        delta
      );

      rearBarrelGroup.position.z = currentExploded * 0.28;
      apertureGroup.position.z = 0.48 + currentExploded * 0.62;
      frontElementGroup.position.z = currentExploded * 0.98;
      hoodGroup.position.z = currentExploded * 1.38;

      const irisRadius = 0.14 + currentAperture * 0.22;
      for (let i = 0; i < irisBlades.length; i++) {
        const blade = irisBlades[i];
        const baseAngle = blade.userData.baseAngle as number;
        blade.position.set(
          Math.cos(baseAngle) * irisRadius,
          Math.sin(baseAngle) * irisRadius,
          0
        );
        blade.rotation.z = baseAngle + 0.65 - currentAperture * 0.45;
      }

      if (!prefersReducedMotion) {
        cameraAssembly.rotation.y = THREE.MathUtils.damp(
          cameraAssembly.rotation.y,
          pointerX * 0.32 + Math.sin(elapsed * 0.5) * 0.08,
          3.8,
          delta
        );
        cameraAssembly.rotation.x = THREE.MathUtils.damp(
          cameraAssembly.rotation.x,
          -pointerY * 0.18 + Math.cos(elapsed * 0.4) * 0.04,
          3.8,
          delta
        );

        orbitalRing1.rotation.z = elapsed * 0.09 + scrollRatio * 0.8;
        orbitalRing2.rotation.z = -elapsed * 0.065 - scrollRatio * 0.6;
        orbitalRing3.rotation.z = elapsed * 0.04;

        dustParticles.rotation.y = elapsed * 0.025 + pointerX * 0.08;
      }

      for (let i = 0; i < floatingFrameMeshes.length; i++) {
        const fg = floatingFrameMeshes[i];
        const meta = fg.userData.frameMeta as FloatingFrameMeta;
        const outerMesh = fg.userData.outerMesh as THREE.Mesh;
        const basePos = fg.userData.basePos as THREE.Vector3;
        const baseRot = fg.userData.baseRot as THREE.Euler;
        const baseScale = fg.userData.baseScale as number;
        const phase = fg.userData.phaseOffset as number;

        const isHovered = hoveredFrameId === meta.id;
        const isFocused = activeFocusId === meta.id;
        const targetBoost = isFocused ? 1.0 : isHovered ? 0.65 : 0;

        const nextBoost = THREE.MathUtils.damp(
          fg.userData.currentHoverBoost as number,
          targetBoost,
          6.5,
          delta
        );
        fg.userData.currentHoverBoost = nextBoost;

        outerMesh.material =
          isHovered || isFocused ? activeGoldFrameMat : brushedGoldMat;

        const floatY = prefersReducedMotion
          ? 0
          : Math.sin(elapsed * 0.85 + phase) * 0.09;
        const floatX = prefersReducedMotion
          ? 0
          : Math.cos(elapsed * 0.65 + phase) * 0.05;

        const depthFactor = Math.abs(basePos.z) * 0.06;
        fg.position.x = THREE.MathUtils.damp(
          fg.position.x,
          basePos.x + floatX - pointerX * depthFactor,
          4.5,
          delta
        );
        fg.position.y = THREE.MathUtils.damp(
          fg.position.y,
          basePos.y + floatY - pointerY * depthFactor * 0.7,
          4.5,
          delta
        );
        fg.position.z = THREE.MathUtils.damp(
          fg.position.z,
          basePos.z + nextBoost * 0.42,
          5.5,
          delta
        );

        const targetRotY = THREE.MathUtils.lerp(
          baseRot.y + pointerX * 0.08,
          0,
          nextBoost * 0.55
        );
        const targetRotX = THREE.MathUtils.lerp(
          baseRot.x - pointerY * 0.06,
          0,
          nextBoost * 0.55
        );
        fg.rotation.y = THREE.MathUtils.damp(
          fg.rotation.y,
          targetRotY,
          5.0,
          delta
        );
        fg.rotation.x = THREE.MathUtils.damp(
          fg.rotation.x,
          targetRotX,
          5.0,
          delta
        );

        const s = baseScale * (1 + nextBoost * 0.12);
        fg.scale.setScalar(s);
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      clock.getDelta();
      tick();
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
    };

    // Pause WebGL rendering when Hero is scrolled out of view so page scrolling is 100% lag-free
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isHeroVisible = entry ? entry.isIntersecting : true;
        if (isHeroVisible && !document.hidden) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(mountEl);

    const handleVisibilityChange = () => {
      if (document.hidden || !isHeroVisible) {
        stopLoop();
      } else {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mountEl.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      renderer.domElement.removeEventListener(
        'webglcontextlost',
        handleContextLost
      );

      disposableGeometries.forEach((g) => g.dispose());
      disposableTextures.forEach((t) => t.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      envTexture.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#171518] via-[#35251F]/60 to-[#171518] relative overflow-hidden flex items-center justify-end px-6 sm:px-14">
        {/* Rich 2D Editorial Gallery Fallback Composition when WebGL is disabled */}
        <div className="grid grid-cols-2 gap-4 max-w-xl w-full opacity-65">
          {HERO_GALLERY_FRAMES.slice(0, 4).map((frame) => (
            <button
              key={frame.id}
              type="button"
              onClick={() => onSelectFrame(frame)}
              className="group relative h-52 sm:h-64 rounded-xl overflow-hidden border border-[#C5A15A]/40 shadow-2xl text-left cursor-pointer"
            >
              <EditorialImage
                id={`fallback-${frame.id}`}
                alt={frame.title}
                theme={frame.theme}
                aspect="portrait"
                className="w-full h-full"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#171518] to-transparent">
                <p className="font-editorial text-sm text-[#F7F0E5]">
                  {frame.title}
                </p>
                <p className="font-exif text-[10px] text-[#C5A15A]">
                  {frame.exif}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasMountRef}
      aria-label="Ruang Galeri Fotografi 3D Interaktif"
      className="w-full h-full relative overflow-hidden"
    />
  );
};

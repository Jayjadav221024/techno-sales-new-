import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroCanvas({ category = 'motors' }) {
  const containerRef = useRef(null);
  const meshGroupRef = useRef(null);

  // Set up the scene, camera, renderer, particles, and render loop once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 8, 10);
    scene.add(dirLight);

    const cyanPointLight = new THREE.PointLight(0x00e5ff, 4.0, 50);
    cyanPointLight.position.set(10, 10, 10);
    scene.add(cyanPointLight);

    const amberPointLight = new THREE.PointLight(0xff9f1c, 4.0, 50);
    amberPointLight.position.set(-10, -10, -5);
    scene.add(amberPointLight);

    const getLayoutConfig = () => {
      const isMobile = window.innerWidth <= 968;
      return {
        x: isMobile ? 0 : 4.8,
        y: isMobile ? -1.0 : 0,
        gridY: isMobile ? -4.2 : -3.2,
        scale: isMobile ? 0.65 : 1.0
      };
    };

    const config = getLayoutConfig();

    // Mesh Group Container
    const meshGroup = new THREE.Group();
    meshGroup.position.set(config.x, config.y, 0);
    meshGroup.scale.setScalar(config.scale);
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Holographic Polar Grid
    const gridHelper = new THREE.PolarGridHelper(3.4, 16, 8, 64, 0x00e5ff, 0x002233);
    gridHelper.position.set(config.x, config.gridY, 0);
    gridHelper.scale.setScalar(config.scale);
    scene.add(gridHelper);

    // Laser Scanning Ring
    const scanningRingGeo = new THREE.RingGeometry(3.1, 3.2, 64);
    const scanningRingMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const scanningRing = new THREE.Mesh(scanningRingGeo, scanningRingMat);
    scanningRing.position.set(config.x, config.y, 0);
    scanningRing.scale.setScalar(config.scale);
    scanningRing.rotation.x = Math.PI / 2;
    scene.add(scanningRing);

    // Tech Particles
    const particleCount = 450;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleMesh);

    // Mouse Controls
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const conf = getLayoutConfig();
      meshGroup.position.set(conf.x, conf.y, 0);
      meshGroup.scale.setScalar(conf.scale);
      gridHelper.position.set(conf.x, conf.gridY, 0);
      gridHelper.scale.setScalar(conf.scale);
      scanningRing.position.set(conf.x, conf.y, 0);
      scanningRing.scale.setScalar(conf.scale);

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId = null;
    // Rendering a full WebGL scene every frame while the hero is scrolled out
    // of view is the single most expensive thing on the page. Only run the
    // loop while the canvas is actually visible.
    let inViewport = true;
    let tabVisible = !document.hidden;

    const animate = () => {
      if (!inViewport || !tabVisible) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      // Rotate group
      meshGroup.rotation.x += 0.003;
      meshGroup.rotation.y += 0.005;

      // Mouse interactive tilt
      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.4;

      meshGroup.rotation.y += (targetRotationY - meshGroup.rotation.y) * 0.05;
      meshGroup.rotation.x += (targetRotationX - meshGroup.rotation.x) * 0.05;

      // Animate laser scanning ring up and down
      scanningRing.position.y = Math.sin(Date.now() * 0.002) * 2.8;

      // Particles motion
      particleMesh.rotation.y -= 0.001;
      particleMesh.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { 
        inViewport = entry.isIntersecting; 
        if (inViewport && tabVisible && !animationFrameId) {
          animate();
        }
      },
      { rootMargin: '120px' }
    );
    visibilityObserver.observe(container);

    // Also idle while the tab is in the background
    const handleVisibility = () => { 
      tabVisible = !document.hidden; 
      if (inViewport && tabVisible && !animationFrameId) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particlesGeo.dispose();
      particlesMat.dispose();
      gridHelper.dispose();
      scanningRingGeo.dispose();
      scanningRingMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update geometry inside meshGroup when category changes
  useEffect(() => {
    const meshGroup = meshGroupRef.current;
    if (!meshGroup) return;

    // Clear existing meshes
    while (meshGroup.children.length > 0) {
      const child = meshGroup.children[0];
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      // Recursively dispose children if it is a Group
      if (child.children && child.children.length > 0) {
        while (child.children.length > 0) {
          const subChild = child.children[0];
          if (subChild.geometry) subChild.geometry.dispose();
          if (subChild.material) {
            if (Array.isArray(subChild.material)) subChild.material.forEach((m) => m.dispose());
            else subChild.material.dispose();
          }
          child.remove(subChild);
        }
      }
      meshGroup.remove(child);
    }

    const cat = (category || '').toLowerCase();

    if (cat.includes('motor')) {
      // High-Fidelity Motor Model
      const motorGroup = new THREE.Group();

      // Outer Stator body
      const statorGeo = new THREE.CylinderGeometry(2.8, 2.8, 4.5, 32, 1, true);
      const statorMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      const stator = new THREE.Mesh(statorGeo, statorMat);
      stator.rotation.z = Math.PI / 2;
      motorGroup.add(stator);

      // Cooling Fins (Siemens grey-cyan style)
      const finCount = 16;
      const finGeo = new THREE.BoxGeometry(4.2, 0.15, 0.6);
      const finMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x003344,
        emissiveIntensity: 0.3
      });
      for (let i = 0; i < finCount; i++) {
        const angle = (i / finCount) * Math.PI * 2;
        const fin = new THREE.Mesh(finGeo, finMat);
        fin.position.set(0, Math.cos(angle) * 3.0, Math.sin(angle) * 3.0);
        fin.rotation.x = angle;
        motorGroup.add(fin);
      }

      // Inner Rotor Core
      const rotorGeo = new THREE.CylinderGeometry(2.2, 2.2, 4.8, 24);
      const rotorMat = new THREE.MeshStandardMaterial({
        color: 0xff9f1c,
        metalness: 0.9,
        roughness: 0.3
      });
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.rotation.z = Math.PI / 2;
      motorGroup.add(rotor);

      // Shaft Drive
      const shaftGeo = new THREE.CylinderGeometry(0.7, 0.7, 8.5, 32);
      const shaftMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.1
      });
      const shaft = new THREE.Mesh(shaftGeo, shaftMat);
      shaft.rotation.z = Math.PI / 2;
      motorGroup.add(shaft);

      // Glowing Rings
      const ringGeo = new THREE.TorusGeometry(3.1, 0.08, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const ring1 = new THREE.Mesh(ringGeo, ring1Mat);
      ring1.rotation.y = Math.PI / 2;
      ring1.position.x = -1.8;
      motorGroup.add(ring1);

      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xff9f1c });
      const ring2 = new THREE.Mesh(ringGeo, ring2Mat);
      ring2.rotation.y = Math.PI / 2;
      ring2.position.x = 1.8;
      motorGroup.add(ring2);

      meshGroup.add(motorGroup);

    } else if (cat.includes('switch') || cat.includes('breaker')) {
      // Detailed Siemens Overload Relay & Contactor Block
      const switchGroup = new THREE.Group();

      // Main tall dark-grey housing
      const mainBody = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 5.0, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.7, roughness: 0.4 }) // zinc grey
      );
      switchGroup.add(mainBody);

      // Front Faceplate
      const facePlate = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 4.6, 0.2),
        new THREE.MeshStandardMaterial({ color: 0x3f3f46, metalness: 0.5, roughness: 0.3 })
      );
      facePlate.position.z = 1.25;
      switchGroup.add(facePlate);

      // Rotary Switch Dial
      const dialBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.2, 24),
        new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9 })
      );
      dialBase.position.set(0, 1.0, 1.35);
      dialBase.rotation.x = Math.PI / 2;
      switchGroup.add(dialBase);

      const knobHandle = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.85, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.8 })
      );
      knobHandle.position.set(0, 1.0, 1.45);
      knobHandle.rotation.x = Math.PI / 2;
      knobHandle.rotation.z = Math.PI / 5; // Rotated dial orientation
      switchGroup.add(knobHandle);

      // Red test button (Cylinder shape matching photo)
      const redBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.3, 16),
        new THREE.MeshBasicMaterial({ color: 0xd97706 }) // Orange-amber style
      );
      redBtn.position.set(-0.55, -0.6, 1.35);
      redBtn.rotation.x = Math.PI / 2;
      switchGroup.add(redBtn);

      // Blue reset button
      const blueBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.3, 16),
        new THREE.MeshBasicMaterial({ color: 0x2563eb }) // Blue style
      );
      blueBtn.position.set(0.55, -0.6, 1.35);
      blueBtn.rotation.x = Math.PI / 2;
      switchGroup.add(blueBtn);

      meshGroup.add(switchGroup);

    } else if (cat.includes('cable') || cat.includes('wire')) {
      // High-Fidelity Power Cable Strands & Wire Reels
      const cableGroup = new THREE.Group();

      const copperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.1 }); // Copper conductor
      const sheathMat = new THREE.MeshStandardMaterial({ color: 0xe4e4e7, metalness: 0.1, roughness: 0.6 }); // White/Silver inner sheet
      const jacketRed = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.4, roughness: 0.5 }); // Orange-Red jacket
      const jacketBlue = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.4, roughness: 0.5 }); // Blue jacket

      // Red Cable Strand
      const cable1 = new THREE.Group();
      cable1.position.set(-1.0, 0, 0);
      cable1.rotation.z = -0.05;
      const body1 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 5.0, 24), jacketRed);
      const inner1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 5.4, 24), sheathMat);
      inner1.position.y = 0.2;
      const copper1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 5.8, 24), copperMat);
      copper1.position.y = 0.4;
      cable1.add(body1);
      cable1.add(inner1);
      cable1.add(copper1);
      cableGroup.add(cable1);

      // Blue Cable Strand
      const cable2 = new THREE.Group();
      cable2.position.set(0.1, 0, -0.4);
      cable2.rotation.z = 0.12;
      const body2 = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 4.6, 24), jacketBlue);
      const inner2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 5.0, 24), sheathMat);
      inner2.position.y = 0.2;
      const copper2 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 5.4, 24), copperMat);
      copper2.position.y = 0.4;
      cable2.add(body2);
      cable2.add(inner2);
      cable2.add(copper2);
      cableGroup.add(cable2);

      // Reels at bottom
      const reel1 = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.35, 12, 40), jacketRed);
      reel1.position.set(1.1, -1.6, 0.4);
      reel1.rotation.x = Math.PI / 2.2;
      cableGroup.add(reel1);

      const reel2 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.3, 12, 40), jacketBlue);
      reel2.position.set(0.9, -1.1, 1.0);
      reel2.rotation.x = Math.PI / 2.3;
      cableGroup.add(reel2);

      meshGroup.add(cableGroup);

    } else {
      // Detailed FRP Gratings & Ladder Trays
      const frpGroup = new THREE.Group();

      // Yellow Molded Grating (Left side)
      const gratingGroup = new THREE.Group();
      gratingGroup.position.set(-1.6, 0.4, 0);
      gratingGroup.rotation.set(0.2, -0.3, 0.1);

      const gridColor = 0xeab308; // Yellow
      const gridMat = new THREE.MeshStandardMaterial({ color: gridColor, metalness: 0.2, roughness: 0.5 });
      const barThickness = 0.12;
      const gridSize = 3.0;
      const step = 0.6;

      for (let x = -gridSize / 2; x <= gridSize / 2; x += step) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(barThickness, gridSize, 0.4), gridMat);
        bar.position.x = x;
        gratingGroup.add(bar);
      }
      for (let y = -gridSize / 2; y <= gridSize / 2; y += step) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(gridSize, barThickness, 0.4), gridMat);
        bar.position.y = y;
        gratingGroup.add(bar);
      }
      const border = new THREE.Mesh(
        new THREE.BoxGeometry(gridSize + barThickness, gridSize + barThickness, 0.45),
        gridMat
      );
      gratingGroup.add(border);
      frpGroup.add(gratingGroup);

      // Grey Cable Ladder (Right side)
      const ladderGroup = new THREE.Group();
      ladderGroup.position.set(1.4, -0.4, 0);
      ladderGroup.rotation.set(-0.2, 0.4, -0.2);

      const metalMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });
      
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 5.0, 0.45), metalMat);
      rail1.position.x = -0.9;
      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 5.0, 0.45), metalMat);
      rail2.position.x = 0.9;
      
      ladderGroup.add(rail1);
      ladderGroup.add(rail2);

      const rungGeo = new THREE.BoxGeometry(1.8, 0.12, 0.12);
      for (let y = -2.0; y <= 2.0; y += 0.8) {
        const rung = new THREE.Mesh(rungGeo, metalMat);
        rung.position.y = y;
        ladderGroup.add(rung);
      }
      frpGroup.add(ladderGroup);

      meshGroup.add(frpGroup);
    }
  }, [category]);

  return <div id="hero-canvas" ref={containerRef} />;
}

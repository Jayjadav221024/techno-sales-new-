import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeModalCanvas({ category }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvas
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLightMain = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLightMain.position.set(5, 8, 10);
    scene.add(dirLightMain);

    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const amberLight = new THREE.DirectionalLight(0xff9f1c, 1.5);
    amberLight.position.set(-5, -5, -3);
    scene.add(amberLight);

    // Mesh Group
    const currentMeshGroup = new THREE.Group();
    scene.add(currentMeshGroup);

    // List of assets to dispose
    const disposables = [];

    // Load Model based on category
    const cat = (category || '').toLowerCase();
    if (cat.includes('motor')) {
      const motorGroup = new THREE.Group();

      // Outer Stator body
      const statorGeo = new THREE.CylinderGeometry(1.8, 1.8, 3.2, 32, 1, true);
      const statorMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      const stator = new THREE.Mesh(statorGeo, statorMat);
      stator.rotation.z = Math.PI / 2;
      motorGroup.add(stator);
      disposables.push(statorGeo, statorMat);

      // Cooling Fins
      const finCount = 12;
      const finGeo = new THREE.BoxGeometry(3.0, 0.1, 0.4);
      const finMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.9,
        roughness: 0.1
      });
      disposables.push(finGeo, finMat);
      for (let i = 0; i < finCount; i++) {
        const angle = (i / finCount) * Math.PI * 2;
        const fin = new THREE.Mesh(finGeo, finMat);
        fin.position.set(0, Math.cos(angle) * 2.0, Math.sin(angle) * 2.0);
        fin.rotation.x = angle;
        motorGroup.add(fin);
      }

      // Inner Rotor Core
      const rotorGeo = new THREE.CylinderGeometry(1.4, 1.4, 3.4, 24);
      const rotorMat = new THREE.MeshStandardMaterial({
        color: 0xff9f1c,
        metalness: 0.9,
        roughness: 0.3
      });
      const rotor = new THREE.Mesh(rotorGeo, rotorMat);
      rotor.rotation.z = Math.PI / 2;
      motorGroup.add(rotor);
      disposables.push(rotorGeo, rotorMat);

      // Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.45, 0.45, 6.0, 32);
      const shaftMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.1
      });
      const shaft = new THREE.Mesh(shaftGeo, shaftMat);
      shaft.rotation.z = Math.PI / 2;
      motorGroup.add(shaft);
      disposables.push(shaftGeo, shaftMat);

      currentMeshGroup.add(motorGroup);

    } else if (cat.includes('switch') || cat.includes('breaker')) {
      const switchGroup = new THREE.Group();

      const mainBody = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 3.6, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.7, roughness: 0.4 })
      );
      switchGroup.add(mainBody);

      const facePlate = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 3.2, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x3f3f46, metalness: 0.5, roughness: 0.3 })
      );
      facePlate.position.z = 0.9;
      switchGroup.add(facePlate);

      // Dial
      const dialBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.15, 24),
        new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9 })
      );
      dialBase.position.set(0, 0.7, 0.98);
      dialBase.rotation.x = Math.PI / 2;
      switchGroup.add(dialBase);

      const knobHandle = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.6, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.8 })
      );
      knobHandle.position.set(0, 0.7, 1.05);
      knobHandle.rotation.x = Math.PI / 2;
      knobHandle.rotation.z = Math.PI / 5;
      switchGroup.add(knobHandle);

      // Red and Blue buttons
      const redBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16),
        new THREE.MeshBasicMaterial({ color: 0xd97706 })
      );
      redBtn.position.set(-0.4, -0.4, 0.98);
      redBtn.rotation.x = Math.PI / 2;
      switchGroup.add(redBtn);

      const blueBtn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16),
        new THREE.MeshBasicMaterial({ color: 0x2563eb })
      );
      blueBtn.position.set(0.4, -0.4, 0.98);
      blueBtn.rotation.x = Math.PI / 2;
      switchGroup.add(blueBtn);

      currentMeshGroup.add(switchGroup);

    } else if (cat.includes('cable') || cat.includes('wire')) {
      const cableGroup = new THREE.Group();

      const copperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95 });
      const sheathMat = new THREE.MeshStandardMaterial({ color: 0xe4e4e7, metalness: 0.1 });
      const jacketRed = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.4 });
      const jacketBlue = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.4 });

      // Red Strand
      const cable1 = new THREE.Group();
      cable1.position.set(-0.7, 0, 0);
      const body1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 3.8, 24), jacketRed);
      const inner1 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 4.1, 24), sheathMat);
      inner1.position.y = 0.15;
      const copper1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.4, 24), copperMat);
      copper1.position.y = 0.3;
      cable1.add(body1);
      cable1.add(inner1);
      cable1.add(copper1);
      cableGroup.add(cable1);

      // Blue Strand
      const cable2 = new THREE.Group();
      cable2.position.set(0.1, 0, -0.3);
      cable2.rotation.z = 0.1;
      const body2 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 3.5, 24), jacketBlue);
      const inner2 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 3.8, 24), sheathMat);
      inner2.position.y = 0.15;
      const copper2 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.1, 24), copperMat);
      copper2.position.y = 0.3;
      cable2.add(body2);
      cable2.add(inner2);
      cable2.add(copper2);
      cableGroup.add(cable2);

      // Reels at bottom
      const reel1 = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.25, 12, 40), jacketRed);
      reel1.position.set(0.8, -1.2, 0.3);
      reel1.rotation.x = Math.PI / 2.2;
      cableGroup.add(reel1);

      const reel2 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.22, 12, 40), jacketBlue);
      reel2.position.set(0.6, -0.8, 0.8);
      reel2.rotation.x = Math.PI / 2.3;
      cableGroup.add(reel2);

      currentMeshGroup.add(cableGroup);

    } else {
      const frpGroup = new THREE.Group();

      // Yellow Molded Grating
      const gratingGroup = new THREE.Group();
      gratingGroup.position.set(-1.1, 0.3, 0);
      gratingGroup.rotation.set(0.2, -0.3, 0.1);

      const gridColor = 0xeab308;
      const gridMat = new THREE.MeshStandardMaterial({ color: gridColor, metalness: 0.2, roughness: 0.5 });
      const barThickness = 0.08;
      const gridSize = 2.2;
      const step = 0.45;

      for (let x = -gridSize / 2; x <= gridSize / 2; x += step) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(barThickness, gridSize, 0.3), gridMat);
        bar.position.x = x;
        gratingGroup.add(bar);
      }
      for (let y = -gridSize / 2; y <= gridSize / 2; y += step) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(gridSize, barThickness, 0.3), gridMat);
        bar.position.y = y;
        gratingGroup.add(bar);
      }
      const border = new THREE.Mesh(
        new THREE.BoxGeometry(gridSize + barThickness, gridSize + barThickness, 0.33),
        gridMat
      );
      gratingGroup.add(border);
      frpGroup.add(gratingGroup);

      // Grey Cable Ladder
      const ladderGroup = new THREE.Group();
      ladderGroup.position.set(1.0, -0.3, 0);
      ladderGroup.rotation.set(-0.2, 0.4, -0.2);

      const metalMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });
      
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.6, 0.3), metalMat);
      rail1.position.x = -0.6;
      const rail2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.6, 0.3), metalMat);
      rail2.position.x = 0.6;
      ladderGroup.add(rail1);
      ladderGroup.add(rail2);

      const rungGeo = new THREE.BoxGeometry(1.2, 0.08, 0.08);
      for (let y = -1.4; y <= 1.4; y += 0.6) {
        const rung = new THREE.Mesh(rungGeo, metalMat);
        rung.position.y = y;
        ladderGroup.add(rung);
      }
      frpGroup.add(ladderGroup);

      currentMeshGroup.add(frpGroup);
    }

    // Drag Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      currentMeshGroup.rotation.y += deltaMove.x * 0.01;
      currentMeshGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Render loop. This canvas now also sits mid-page on the product detail
    // route, so it idles whenever it is scrolled away or the tab is hidden.
    let animationFrameId;
    let inViewport = true;
    let tabVisible = !document.hidden;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!inViewport || !tabVisible) return;

      if (!isDragging) {
        currentMeshGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { inViewport = entry.isIntersecting; },
      { rootMargin: '120px' }
    );
    visibilityObserver.observe(canvas);

    const handleVisibility = () => { tabVisible = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [category]);

  return (
    <div className="modal-canvas-wrapper" style={{ width: '100%', height: '320px', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
      <div className="canvas-drag-hint" style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.75rem',
        /* Dark pill over live 3D — pin light text rather than inherit
           --text-muted, which is dark ink in the light theme. */
        color: '#E8E6EE',
        background: 'rgba(15, 23, 42, 0.75)',
        padding: '3px 10px',
        borderRadius: '10px',
        pointerEvents: 'none'
      }}>
        Drag to Rotate 3D Preview
      </div>
    </div>
  );
}

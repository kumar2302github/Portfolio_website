import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  radius: number;
  connections: number[];
}

interface Edge {
  from: number;
  to: number;
  ctrlOffset: number;
}

interface Pulse {
  t: number;
  active: boolean;
  timer: number;
  interval: number;
}

interface Spore {
  x: number;
  y: number;
  vx: number;
  vy: number;
  lifetime: number;
  maxLifetime: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function FungalNetwork() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const sketch = (p: p5) => {
      let nodes: Node[] = [];
      let edges: Edge[] = [];
      let pulses: Pulse[] = [];
      let spores: Spore[] = [];
      let pulseWaves: PulseWave[] = [];
      let mouseX = 0;
      let mouseY = 0;
      let isMobile = false;
      let running = true;

      const getNodeCount = () => (p.width >= 768 ? 280 : 80);

      const poissonDiscSampling = (
        w: number,
        h: number,
        minDist: number,
        maxAttempts = 30
      ): { x: number; y: number }[] => {
        const cellSize = minDist / Math.sqrt(2);
        const cols = Math.ceil(w / cellSize);
        const rows = Math.ceil(h / cellSize);
        const grid: (number | null)[][] = Array(rows)
          .fill(null)
          .map(() => Array(cols).fill(null));
        const points: { x: number; y: number }[] = [];
        const activeList: number[] = [];

        const firstX = p.random(w);
        const firstY = p.random(h);
        const firstCol = Math.floor(firstX / cellSize);
        const firstRow = Math.floor(firstY / cellSize);
        points.push({ x: firstX, y: firstY });
        grid[firstRow][firstCol] = 0;
        activeList.push(0);

        while (activeList.length > 0) {
          const randomIndex = Math.floor(p.random(activeList.length));
          const currentIndex = activeList[randomIndex];
          const currentPoint = points[currentIndex];
          let found = false;

          for (let i = 0; i < maxAttempts; i++) {
            const angle = p.random(p.TWO_PI);
            const dist = p.random(minDist, minDist * 2);
            const newX = currentPoint.x + Math.cos(angle) * dist;
            const newY = currentPoint.y + Math.sin(angle) * dist;

            if (newX < 0 || newX > w || newY < 0 || newY > h) continue;

            const col = Math.floor(newX / cellSize);
            const row = Math.floor(newY / cellSize);

            let valid = true;
            for (
              let r = Math.max(0, row - 2);
              r <= Math.min(rows - 1, row + 2);
              r++
            ) {
              for (
                let c = Math.max(0, col - 2);
                c <= Math.min(cols - 1, col + 2);
                c++
              ) {
                const neighborIndex = grid[r][c];
                if (neighborIndex !== null && neighborIndex !== undefined) {
                  const neighbor = points[neighborIndex as number];
                  const d = Math.hypot(newX - neighbor.x, newY - neighbor.y);
                  if (d < minDist) {
                    valid = false;
                    break;
                  }
                }
              }
              if (!valid) break;
            }

            if (valid) {
              grid[row][col] = points.length;
              points.push({ x: newX, y: newY });
              activeList.push(points.length - 1);
              found = true;
              break;
            }
          }

          if (!found) {
            activeList.splice(randomIndex, 1);
          }
        }

        return points;
      };

      const createNodes = () => {
        const nodeCount = getNodeCount();
        isMobile = p.width < 768;
        const points = poissonDiscSampling(p.width, p.height, 40, 30);

        const selectedPoints = points.slice(0, Math.min(nodeCount, points.length));
        while (selectedPoints.length < nodeCount) {
          selectedPoints.push({
            x: p.random(p.width),
            y: p.random(p.height),
          });
        }

        nodes = selectedPoints.map((pt) => ({
          x: pt.x,
          y: pt.y,
          vx: p.random(-0.15, 0.15),
          vy: p.random(-0.15, 0.15),
          noiseOffsetX: p.random(10000),
          noiseOffsetY: p.random(10000),
          radius: p.random(1.5, 3.5),
          connections: [],
        }));

        edges = [];
        for (let i = 0; i < nodes.length; i++) {
          const distances: { index: number; dist: number }[] = [];
          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (d < 120) {
              distances.push({ index: j, dist: d });
            }
          }
          distances.sort((a, b) => a.dist - b.dist);
          const connectionCount = Math.min(5, distances.length);
          nodes[i].connections = distances
            .slice(0, connectionCount)
            .map((d) => d.index);

          for (let k = 0; k < connectionCount; k++) {
            const j = distances[k].index;
            if (i < j) {
              edges.push({
                from: i,
                to: j,
                ctrlOffset: p.random(15, 30) * (Math.random() > 0.5 ? 1 : -1),
              });
            }
          }
        }

        pulses = edges.map(() => ({
          t: 0,
          active: false,
          timer: 0,
          interval: p.random(4000, 9000),
        }));
      };

      const handleVisibilityChange = () => {
        running = !document.hidden;
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      let lastScrollTriggerY = 0;
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollTriggerY) > 80) {
          pulseWaves.push({
            x: p.width / 2,
            y: p.height / 2,
            radius: 0,
            maxRadius: p.width >= 768 ? 400 : 250,
            alpha: 0.6,
          });
          lastScrollTriggerY = currentScrollY;
        }
      };

      const handleTouch = (e: TouchEvent) => {
        const touch = e.touches[0];
        pulseWaves.push({
          x: touch.clientX,
          y: touch.clientY,
          radius: 0,
          maxRadius: 250,
          alpha: 0.6,
        });
      };

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);

        createNodes();
        lastScrollTriggerY = window.scrollY;

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        if ('ontouchstart' in window) {
          document.addEventListener('touchstart', handleTouch, { passive: true });
        }
      };

      p.draw = () => {
        if (!running || document.hidden) return;

        p.clear();

        // Update node positions with drift
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          node.x += (p.noise(node.noiseOffsetX) - 0.5) * 0.25;
          node.y += (p.noise(node.noiseOffsetY) - 0.5) * 0.25;
          node.noiseOffsetX += 0.003;
          node.noiseOffsetY += 0.003;

          if (node.x < -10) node.x = p.width + 10;
          if (node.x > p.width + 10) node.x = -10;
          if (node.y < -10) node.y = p.height + 10;
          if (node.y > p.height + 10) node.y = -10;

          node.vx *= 0.92;
          node.vy *= 0.92;
          node.x += node.vx;
          node.y += node.vy;
        }

        // Cursor interaction
        let closestNode = -1;
        let closestDist = Infinity;

        if (!isMobile && mouseX > 0 && mouseY > 0) {
          for (let i = 0; i < nodes.length; i++) {
            const d = Math.hypot(mouseX - nodes[i].x, mouseY - nodes[i].y);
            if (d < 120) {
              const proximity = 1 - d / 120;
              nodes[i].vx += (mouseX - nodes[i].x) * proximity * 0.0008;
              nodes[i].vy += (mouseY - nodes[i].y) * proximity * 0.0008;
            }
            if (d < closestDist && d < 80) {
              closestDist = d;
              closestNode = i;
            }
          }

          if (closestNode >= 0) {
            for (let s = 0; s < 3; s++) {
              const angle = p.random(p.TWO_PI);
              const speed = p.random(0.5, 2);
              spores.push({
                x: nodes[closestNode].x,
                y: nodes[closestNode].y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                lifetime: 60,
                maxLifetime: 60,
              });
            }
          }
        }

        // Draw edges
        const pointToBezierDistance = (
          px: number,
          py: number,
          x0: number,
          y0: number,
          cx: number,
          cy: number,
          x2: number,
          y2: number
        ): number => {
          let minDist = Infinity;
          for (let t = 0; t <= 1; t += 0.05) {
            const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x2;
            const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y2;
            const d = Math.hypot(px - x, py - y);
            if (d < minDist) minDist = d;
          }
          return minDist;
        };

        for (let i = 0; i < edges.length; i++) {
          const edge = edges[i];
          const from = nodes[edge.from];
          const to = nodes[edge.to];
          const pulse = pulses[i];

          pulse.timer += p.deltaTime;
          if (!pulse.active && pulse.timer > pulse.interval) {
            pulse.active = true;
            pulse.t = 0;
            pulse.timer = 0;
            pulse.interval = p.random(4000, 9000);
          }
          if (pulse.active) {
            pulse.t += 0.008;
            if (pulse.t > 1) {
              pulse.active = false;
              pulse.t = 0;
            }
          }

          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const perpX = (-dy / len) * edge.ctrlOffset;
          const perpY = (dx / len) * edge.ctrlOffset;
          const ctrlX = midX + perpX;
          const ctrlY = midY + perpY;

          let edgeAlpha = 0.55;

          if (!isMobile && mouseX > 0 && mouseY > 0) {
            const distToEdge = pointToBezierDistance(
              mouseX,
              mouseY,
              from.x,
              from.y,
              ctrlX,
              ctrlY,
              to.x,
              to.y
            );
            if (distToEdge < 120) {
              const proximity = 1 - distToEdge / 120;
              edgeAlpha = 0.55 + proximity * 0.4;
            }
          }

          if (pulse.active) {
            const pulseDist = Math.abs(pulse.t - 0.5) * 2;
            if (pulseDist < 0.2) {
              const brightAmount = 1 - pulseDist / 0.2;
              edgeAlpha = p.lerp(edgeAlpha, 0.85, brightAmount);
            }
          }

          p.noFill();
          p.stroke(26, 51, 32, edgeAlpha * 255);
          p.strokeWeight(0.6);
          p.strokeCap(p.ROUND);
          p.beginShape();
          p.vertex(from.x, from.y);
          (p as any).quadraticVertex(ctrlX, ctrlY, to.x, to.y);
          p.endShape();

          if (pulse.active) {
            const t = pulse.t;
            const x =
              (1 - t) * (1 - t) * from.x +
              2 * (1 - t) * t * ctrlX +
              t * t * to.x;
            const y =
              (1 - t) * (1 - t) * from.y +
              2 * (1 - t) * t * ctrlY +
              t * t * to.y;

            p.noStroke();
            p.fill(57, 211, 83, 51);
            p.circle(x, y, 12);
            p.fill(57, 211, 83, 230);
            p.circle(x, y, 5);
          }
        }

        // Draw nodes
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          let r = 26;
          let g = 51;
          let b = 32;

          if (!isMobile && mouseX > 0 && mouseY > 0) {
            const d = Math.hypot(mouseX - node.x, mouseY - node.y);
            if (d < 120) {
              const proximity = 1 - d / 120;
              r += (95 - 26) * proximity;
              g += (232 - 51) * proximity;
              b += (118 - 32) * proximity;
            }
          }

          p.noStroke();
          p.fill(r, g, b);
          p.circle(node.x, node.y, node.radius * 2);
        }

        // Spores
        p.noStroke();
        for (let i = spores.length - 1; i >= 0; i--) {
          const spore = spores[i];
          spore.x += spore.vx;
          spore.y += spore.vy;
          spore.vy += 0.02;
          spore.lifetime--;

          if (spore.lifetime <= 0) {
            spores.splice(i, 1);
            continue;
          }

          const alpha = spore.lifetime / spore.maxLifetime;
          p.fill(46, 168, 67, alpha * 136);
          p.circle(spore.x, spore.y, 2);
        }

        // Pulse waves
        for (let i = pulseWaves.length - 1; i >= 0; i--) {
          const wave = pulseWaves[i];
          wave.radius += 4;
          wave.alpha *= 0.96;

          if (wave.alpha < 0.01) {
            pulseWaves.splice(i, 1);
            continue;
          }

          p.noFill();
          p.stroke(57, 211, 83, wave.alpha * 255);
          p.strokeWeight(1.5);
          p.circle(wave.x, wave.y, wave.radius * 2);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        createNodes();
      };
    };

    p5InstanceRef.current = new p5(sketch, canvasContainerRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

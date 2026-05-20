import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  radius: number;
  fx?: number | null;
  fy?: number | null;
}

interface SkillLink extends d3.SimulationLinkDatum<SkillNode> {
  source: string | SkillNode;
  target: string | SkillNode;
}

const skillClusters: Record<number, string[]> = {
  1: ['Python', 'Machine Learning', 'Deep Learning'],
  2: ['RAG', 'LangChain', 'LangGraph', 'LLM Fine-tuning', 'Prompt Engineering', 'Agentic AI', 'MCP'],
  3: ['BERT', 'GPT', 'LayoutLMv3', 'Transformers', 'LoRA/PEFT'],
  4: ['FastAPI', 'Docker', 'Streamlit', 'Vector DBs', 'Git'],
  5: ['NLP', 'Computer Vision', 'OCR', 'PyTorch', 'Hugging Face'],
};

export default function SkillGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [, setHoveredNode] = useState<string | null>(null);

  // Build nodes and links from clusters
  const buildGraphData = (): { nodes: SkillNode[]; links: SkillLink[] } => {
    const nodes: SkillNode[] = [];

    Object.entries(skillClusters).forEach(([group, skills]) => {
      const groupNum = parseInt(group);
      nodes.push({
        id: `Cluster ${groupNum}`,
        group: groupNum,
        radius: 28,
      });

      skills.forEach((skill) => {
        nodes.push({
          id: skill,
          group: groupNum,
          radius: 20,
        });
      });
    });

    const links: SkillLink[] = [];

    Object.entries(skillClusters).forEach(([group, skills]) => {
      const groupNum = parseInt(group);
      const centerId = `Cluster ${groupNum}`;
      skills.forEach((skill) => {
        links.push({ source: skill, target: centerId });
      });
    });

    const crossLinks: [string, string][] = [
      ['Cluster 2', 'Cluster 1'],
      ['Cluster 3', 'Cluster 1'],
      ['Cluster 4', 'Cluster 1'],
      ['Cluster 5', 'Cluster 1'],
      ['Python', 'PyTorch'],
      ['Machine Learning', 'Transformers'],
      ['Deep Learning', 'BERT'],
      ['RAG', 'LangChain'],
      ['LangChain', 'LangGraph'],
      ['RAG', 'Vector DBs'],
      ['BERT', 'NLP'],
      ['Computer Vision', 'OCR'],
      ['LoRA/PEFT', 'LLM Fine-tuning'],
      ['GPT', 'Prompt Engineering'],
      ['FastAPI', 'Streamlit'],
      ['Hugging Face', 'Transformers'],
      ['Agentic AI', 'MCP'],
    ];

    crossLinks.forEach(([source, target]) => {
      links.push({ source, target });
    });

    return { nodes, links };
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: Math.max(rect.height || 400, 400) });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { nodes, links } = buildGraphData();

    const simulation = d3.forceSimulation<SkillNode>(nodes)
      .force('link', d3.forceLink<SkillNode, SkillLink>(links).id((d) => d.id).distance(60))
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collision', d3.forceCollide<SkillNode>().radius(35))
      .alphaDecay(0.02);

    // Draw links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#1A3320')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.4);

    // Draw nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'pointer');

    // Apply drag behavior with proper typing
    const dragBehavior = d3.drag<SVGGElement, SkillNode>()
      .on('start', (event: any, d: SkillNode) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event: any, d: SkillNode) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event: any, d: SkillNode) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(dragBehavior as any);

    // Node circles
    node.append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', '#161B22')
      .attr('stroke', '#21262D')
      .attr('stroke-width', 1);

    // Node labels
    node.append('text')
      .text((d) => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-size', '10px')
      .attr('fill', '#8B949E')
      .attr('pointer-events', 'none')
      .style('user-select', 'none');

    // Hover interactions
    node
      .on('mouseenter', function (_event: any, d: SkillNode) {
        setHoveredNode(d.id);

        d3.select(this).select('circle')
          .attr('fill', '#1C2128')
          .attr('stroke', '#E8C547');

        d3.select(this).select('text')
          .attr('fill', '#E6EDF3');

        link.each(function (l: any) {
          const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
          const targetId = typeof l.target === 'string' ? l.target : l.target.id;

          if (sourceId === d.id || targetId === d.id) {
            d3.select(this)
              .attr('stroke', '#E8C547')
              .attr('stroke-opacity', 0.8);
          }
        });

        node.each(function (n: any) {
          const linkToNode = links.some((l: any) => {
            const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
            const targetId = typeof l.target === 'string' ? l.target : l.target.id;
            return (sourceId === d.id && targetId === n.id) || (targetId === d.id && sourceId === n.id);
          });

          if (linkToNode && n.id !== d.id) {
            d3.select(this).select('circle')
              .attr('stroke', '#39D353');
          }
        });
      })
      .on('mouseleave', function (_event: any, _d: SkillNode) {
        setHoveredNode(null);

        d3.select(this).select('circle')
          .attr('fill', '#161B22')
          .attr('stroke', '#21262D');

        d3.select(this).select('text')
          .attr('fill', '#8B949E');

        link
          .attr('stroke', '#1A3320')
          .attr('stroke-opacity', 0.4);

        node.selectAll('circle')
          .attr('fill', '#161B22')
          .attr('stroke', '#21262D');
      });

    // Tick function
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => (typeof d.source === 'string' ? 0 : d.source.x))
        .attr('y1', (d: any) => (typeof d.source === 'string' ? 0 : d.source.y))
        .attr('x2', (d: any) => (typeof d.target === 'string' ? 0 : d.target.x))
        .attr('y2', (d: any) => (typeof d.target === 'string' ? 0 : d.target.y));

      node.attr('transform', (d: any) => `translate(${d.x || 0},${d.y || 0})`);
    });

    // Ambient drift after settling
    const driftInterval = setInterval(() => {
      simulation.alpha(0.01);
      simulation.restart();
    }, 100);

    return () => {
      clearInterval(driftInterval);
      simulation.stop();
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
      />
    </div>
  );
}
